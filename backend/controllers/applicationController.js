const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job with PDF resume upload
// @route   POST /api/applications/apply/:jobId
// @access  Private/Job Seeker
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      applicantId: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this job',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload your resume in PDF or DOC format',
      });
    }

    const resumePath = `/uploads/${req.file.filename}`;

    const application = await Application.create({
      jobId,
      applicantId: req.user._id,
      resume: resumePath,
      coverLetter: coverLetter || '',
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applications submitted by logged-in Job Seeker
// @route   GET /api/applications/my
// @access  Private/Job Seeker
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user._id })
      .populate({
        path: 'jobId',
        select: 'title companyName location salary jobType experience deadline',
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get applicants for a specific job (or all employer jobs)
// @route   GET /api/applications/job/:jobId
// @access  Private/Employer
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view these applicants' });
    }

    const applications = await Application.find({ jobId })
      .populate('applicantId', 'name email phone profileImage')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications received across all jobs of an employer
// @route   GET /api/applications/employer/all
// @access  Private/Employer
const getEmployerAllApplications = async (req, res) => {
  try {
    const employerJobs = await Job.find({ postedBy: req.user._id }).select('_id');
    const jobIds = employerJobs.map((j) => j._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title companyName location')
      .populate('applicantId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application status (Accept / Reject)
// @route   PUT /api/applications/:id/status
// @access  Private/Employer
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Verify ownership of the job
    if (
      application.jobId.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'Admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: `Application marked as ${status}`,
      data: application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin stats overview
// @route   GET /api/applications/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const User = require('../models/User');
    const Company = require('../models/Company');

    const totalUsers = await User.countDocuments();
    const totalSeekers = await User.countDocuments({ role: 'Job Seeker' });
    const totalEmployers = await User.countDocuments({ role: 'Employer' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalCompanies = await Company.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSeekers,
        totalEmployers,
        totalJobs,
        totalApplications,
        totalCompanies,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getEmployerAllApplications,
  updateApplicationStatus,
  getAdminStats,
};
