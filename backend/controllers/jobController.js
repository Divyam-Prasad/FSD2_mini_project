const Job = require('../models/Job');
const Company = require('../models/Company');
const Application = require('../models/Application');

// @desc    Get all jobs with search and filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, experience, skills } = req.query;
    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { companyName: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (jobType && jobType !== 'All') {
      query.jobType = jobType;
    }

    if (experience && experience !== 'All') {
      query.experience = experience;
    }

    if (skills) {
      const skillsArray = skills.split(',').map((s) => s.trim());
      query.skills = { $in: skillsArray.map((s) => new RegExp(s, 'i')) };
    }

    const jobs = await Job.find(query)
      .populate('company')
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company')
      .populate('postedBy', 'name email phone');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Employer
const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      salary,
      experience,
      jobType,
      skills,
      description,
      deadline,
    } = req.body;

    // Check if employer has a linked company profile
    const employerCompany = await Company.findOne({ owner: req.user._id });

    const job = await Job.create({
      title,
      company: employerCompany ? employerCompany._id : null,
      companyName: employerCompany ? employerCompany.companyName : companyName,
      location,
      salary,
      experience,
      jobType,
      skills: Array.isArray(skills) ? skills : skills ? skills.split(',').map((s) => s.trim()) : [],
      description,
      deadline: deadline || null,
      postedBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Job posted successfully', data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Employer
const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Ensure user is job owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this job' });
    }

    if (req.body.skills && !Array.isArray(req.body.skills)) {
      req.body.skills = req.body.skills.split(',').map((s) => s.trim());
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Job updated successfully', data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Employer/Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this job' });
    }

    // Delete associated applications
    await Application.deleteMany({ jobId: job._id });
    await job.deleteOne();

    res.json({ success: true, message: 'Job and associated applications removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get jobs posted by logged-in employer
// @route   GET /api/jobs/my/listings
// @access  Private/Employer
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });

    // Attach application counts for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    res.json({ success: true, count: jobsWithCounts.length, data: jobsWithCounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all jobs for Admin
// @route   GET /api/jobs/admin/all
// @access  Private/Admin
const getAdminAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({ jobId: job._id });
        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    res.json({ success: true, count: jobsWithCounts.length, data: jobsWithCounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getAdminAllJobs,
};
