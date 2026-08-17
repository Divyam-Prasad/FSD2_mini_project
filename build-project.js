/**
 * ==============================================================================
 * Online Job Portal System - Full-Stack MERN Automated Project Generator
 * ==============================================================================
 * This script scaffolds the complete MERN stack repository with 100% functional,
 * production-ready code for both backend and frontend.
 * 
 * Usage:
 *   node build-project.js
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();

console.log('🚀 Starting Online Job Portal System MERN Scaffold...');
console.log(`📁 Target Directory: ${ROOT_DIR}\n`);

// Helper to ensure directories exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  📂 Created directory: ${path.relative(ROOT_DIR, dirPath)}`);
  }
}

// Helper to write files
function writeFile(filePath, content) {
  const fullPath = path.resolve(ROOT_DIR, filePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log(`  📄 Created file: ${filePath}`);
}

// ==============================================================================
// 1. ROOT CONFIGURATION & SCRIPTS
// ==============================================================================

writeFile('package.json', JSON.stringify({
  name: "online-job-portal-mern",
  version: "1.0.0",
  description: "Full Stack Online Job Portal System built with MongoDB, Express.js, React, and Node.js",
  scripts: {
    "install-all": "npm install && cd backend && npm install && cd ../frontend && npm install",
    "backend": "cd backend && npm run dev",
    "frontend": "cd frontend && npm run dev",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  },
  devDependencies: {
    "concurrently": "^8.2.2"
  }
}, null, 2));

writeFile('README.md', `# 🌟 Online Job Portal System (MERN Stack)

A complete, modern, full-stack Online Job Portal System built with **MongoDB, Express.js, React.js (Vite), and Node.js**.

---

## 🚀 Features

### 👥 Multi-Role Authentication & Access Control
- **Job Seeker**: Browse jobs with real-time search & filters, apply with PDF resume & cover letter, track application status.
- **Employer**: Post jobs, manage job listings, view applicants, review resumes, and accept/reject applications.
- **Admin**: Dashboard analytics, manage all registered users, and moderate job postings.

### 💼 Job Management & Applications
- Comprehensive Job Search by Keyword, Location, Job Type, Experience Level, and Skill tags.
- Multer-powered secure PDF Resume upload and storage.
- Real-time application status tracking (\`Pending\`, \`Accepted\`, \`Rejected\`).
- JWT-based authentication with secure password hashing (\`bcryptjs\`).

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), Multer, Bcrypt.js, CORS, Dotenv.
- **Frontend**: React 18, Vite, React Router v6, Axios, Lucide Icons, Custom Modern CSS Design System.

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 2. Installation
Run the following command from the root directory to install all dependencies for both backend and frontend:
\`\`\`bash
npm run install-all
\`\`\`

Alternatively, install them manually:
\`\`\`bash
# Install root tools
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
\`\`\`

### 3. Configure Environment Variables
In \`backend/.env\`, verify or update your MongoDB connection string and JWT secret:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal_db
JWT_SECRET=super_secret_job_portal_jwt_key_2026
JWT_EXPIRE=30d
\`\`\`

### 4. Run the Application
You can run both backend and frontend simultaneously with a single command from the root directory:
\`\`\`bash
npm run dev
\`\`\`

Or run them in separate terminal windows:
\`\`\`bash
# Terminal 1: Backend (Runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Frontend (Runs on http://localhost:5173)
cd frontend
npm run dev
\`\`\`

Open your browser and navigate to **\`http://localhost:5173\`**.

---

## 🔑 Demo Login Accounts

You can register your own accounts via the UI, or use the built-in quick demo credentials on the Login page:
- **Admin**: \`admin@jobportal.com\` / \`admin123\`
- **Employer**: \`employer@techcorp.com\` / \`employer123\`
- **Job Seeker**: \`seeker@dev.com\` / \`seeker123\`
`);

writeFile('setup-project.sh', `#!/usr/bin/env bash
echo "🚀 Setting up Online Job Portal MERN Stack Project..."
node build-project.js
echo "📦 Installing root dependencies..."
npm install
echo "📦 Installing backend dependencies..."
cd backend && npm install
echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install
cd ..
echo "✅ Setup complete! Run 'npm run dev' to start the application."
`);

// ==============================================================================
// 2. BACKEND FILES
// ==============================================================================

writeFile('backend/package.json', JSON.stringify({
  name: "job-portal-backend",
  version: "1.0.0",
  description: "Backend API for Online Job Portal",
  main: "server.js",
  scripts: {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  dependencies: {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.0",
    "multer": "^1.4.5-lts.1"
  },
  devDependencies: {
    "nodemon": "^3.1.2"
  }
}, null, 2));

writeFile('backend/.env.example', `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal_db
JWT_SECRET=super_secret_job_portal_jwt_key_2026
JWT_EXPIRE=30d
`);

writeFile('backend/.env', `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal_db
JWT_SECRET=super_secret_job_portal_jwt_key_2026
JWT_EXPIRE=30d
`);

writeFile('backend/uploads/.gitkeep', '');

writeFile('backend/config/db.js', `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/job_portal_db');
    console.log(\`✅ MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`❌ MongoDB Connection Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
`);

// --- Models ---
writeFile('backend/models/User.js', `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['Job Seeker', 'Employer', 'Admin'],
      default: 'Job Seeker',
    },
    phone: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
`);

writeFile('backend/models/Company.js', `const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
`);

writeFile('backend/models/Job.js', `const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide job location'],
    },
    salary: {
      type: String,
      required: [true, 'Please provide salary / range'],
    },
    experience: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead / Executive'],
      default: 'Mid Level',
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
      default: 'Full-time',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Please provide job description'],
    },
    deadline: {
      type: Date,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
`);

writeFile('backend/models/Application.js', `const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: String,
      required: [true, 'Please upload your resume (PDF)'],
    },
    coverLetter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications by same user for same job
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
`);

// --- Middleware ---
writeFile('backend/middleware/authMiddleware.js', `const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_job_portal_jwt_key_2026');
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`User role '\${req.user.role}' is not authorized to access this route\`,
      });
    }
    next();
  };
};

module.exports = { protect, requireRole };
`);

writeFile('backend/middleware/uploadMiddleware.js', `const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
`);

// --- Controllers ---
writeFile('backend/controllers/authController.js', `const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_job_portal_jwt_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Job Seeker',
      phone: phone || '',
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        token: generateToken(updatedUser._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/auth/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
`);

writeFile('backend/controllers/companyController.js', `const Company = require('../models/Company');

// @desc    Create or update company profile
// @route   POST /api/companies
// @access  Private/Employer
const createOrUpdateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    let logo = req.file ? \`/uploads/\${req.file.filename}\` : undefined;

    let company = await Company.findOne({ owner: req.user._id });

    if (company) {
      company.companyName = companyName || company.companyName;
      company.description = description !== undefined ? description : company.description;
      company.website = website !== undefined ? website : company.website;
      company.location = location !== undefined ? location : company.location;
      if (logo) company.logo = logo;

      await company.save();
      return res.json({ success: true, message: 'Company updated', data: company });
    }

    company = await Company.create({
      companyName,
      description: description || '',
      website: website || '',
      location: location || '',
      logo: logo || '',
      owner: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Company created', data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current employer's company
// @route   GET /api/companies/my
// @access  Private/Employer
const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('owner', 'name email');
    res.json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateCompany,
  getMyCompany,
  getAllCompanies,
};
`);

writeFile('backend/controllers/jobController.js', `const Job = require('../models/Job');
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
`);

writeFile('backend/controllers/applicationController.js', `const Application = require('../models/Application');
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

    const resumePath = \`/uploads/\${req.file.filename}\`;

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
      message: \`Application marked as \${status}\`,
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
`);

// --- Routes ---
writeFile('backend/routes/authRoutes.js', `const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require('../controllers/authController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/users').get(protect, requireRole('Admin'), getAllUsers);
router.route('/users/:id').delete(protect, requireRole('Admin'), deleteUser);

module.exports = router;
`);

writeFile('backend/routes/companyRoutes.js', `const express = require('express');
const router = express.Router();
const {
  createOrUpdateCompany,
  getMyCompany,
  getAllCompanies,
} = require('../controllers/companyController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getAllCompanies)
  .post(protect, requireRole('Employer'), upload.single('logo'), createOrUpdateCompany);

router.route('/my')
  .get(protect, requireRole('Employer'), getMyCompany);

module.exports = router;
`);

writeFile('backend/routes/jobRoutes.js', `const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getAdminAllJobs,
} = require('../controllers/jobController');
const { protect, requireRole } = require('../middleware/authMiddleware');

router.route('/')
  .get(getJobs)
  .post(protect, requireRole('Employer'), createJob);

router.route('/my/listings')
  .get(protect, requireRole('Employer'), getMyJobs);

router.route('/admin/all')
  .get(protect, requireRole('Admin'), getAdminAllJobs);

router.route('/:id')
  .get(getJobById)
  .put(protect, requireRole('Employer', 'Admin'), updateJob)
  .delete(protect, requireRole('Employer', 'Admin'), deleteJob);

module.exports = router;
`);

writeFile('backend/routes/applicationRoutes.js', `const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getEmployerAllApplications,
  updateApplicationStatus,
  getAdminStats,
} = require('../controllers/applicationController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/apply/:jobId', protect, requireRole('Job Seeker'), upload.single('resume'), applyForJob);
router.get('/my', protect, requireRole('Job Seeker'), getMyApplications);
router.get('/job/:jobId', protect, requireRole('Employer', 'Admin'), getJobApplications);
router.get('/employer/all', protect, requireRole('Employer', 'Admin'), getEmployerAllApplications);
router.put('/:id/status', protect, requireRole('Employer', 'Admin'), updateApplicationStatus);
router.get('/admin/stats', protect, requireRole('Admin'), getAdminStats);

module.exports = router;
`);

// --- Server Entry ---
writeFile('backend/server.js', `const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (PDF resumes, logos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Job Portal Backend running in \${process.env.NODE_ENV || 'development'} mode on port \${PORT}\`);
  console.log(\`🌐 API Base: http://localhost:\${PORT}/api\`);
});
`);

// ==============================================================================
// 3. FRONTEND FILES
// ==============================================================================

writeFile('frontend/package.json', JSON.stringify({
  name: "job-portal-frontend",
  private: true,
  version: "1.0.0",
  type: "module",
  scripts: {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  dependencies: {
    "axios": "^1.7.2",
    "lucide-react": "^0.383.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1"
  },
  devDependencies: {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.2.11"
  }
}, null, 2));

writeFile('frontend/vite.config.js', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
`);

writeFile('frontend/index.html', `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f46e5'><path d='M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TalentPulse | Modern Online Job Portal</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

// --- Frontend Styling ---
writeFile('frontend/src/index.css', `:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #eef2ff;
  --primary-glow: rgba(79, 70, 229, 0.15);
  
  --secondary: #0ea5e9;
  --accent: #8b5cf6;
  
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --bg-subtle: #f1f5f9;
  
  --text-main: #0f172a;
  --text-muted: #64748b;
  --text-light: #94a3b8;
  
  --border-color: #e2e8f0;
  --border-focus: #818cf8;
  
  --success: #10b981;
  --success-bg: #ecfdf5;
  --warning: #f59e0b;
  --warning-bg: #fffbeb;
  --danger: #ef4444;
  --danger-bg: #fef2f2;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
}

/* Layout Utilities */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.95rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, #6366f1 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px var(--primary-glow);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-hover) 0%, #4f46e5 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.25);
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-main);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-subtle);
  border-color: var(--text-muted);
}

.btn-danger {
  background: var(--danger);
  color: #ffffff;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-lg {
  padding: 14px 28px;
  font-size: 1.05rem;
}

.btn-full {
  width: 100%;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-main);
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

textarea.form-control {
  min-height: 120px;
  resize: vertical;
}

/* Badges & Status */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background-color: var(--primary-light);
  color: var(--primary);
}

.badge-pending {
  background-color: var(--warning-bg);
  color: var(--warning);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.badge-accepted {
  background-color: var(--success-bg);
  color: var(--success);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.badge-rejected {
  background-color: var(--danger-bg);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Navbar */
.navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.35rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
}

.nav-link {
  font-weight: 600;
  color: var(--text-muted);
  transition: var(--transition);
}

.nav-link:hover, .nav-link.active {
  color: var(--primary);
}

/* Cards */
.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.card-hover:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(99, 102, 241, 0.3);
}

/* Dashboard Layout */
.dashboard-container {
  display: flex;
  min-height: calc(100vh - 72px);
}

.dashboard-sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid var(--border-color);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-weight: 600;
  color: var(--text-muted);
  transition: var(--transition);
}

.sidebar-link:hover {
  background-color: var(--bg-subtle);
  color: var(--text-main);
}

.sidebar-link.active {
  background-color: var(--primary-light);
  color: var(--primary);
}

.dashboard-body {
  flex: 1;
  padding: 32px;
  background-color: var(--bg-main);
  overflow-y: auto;
}

/* Tables */
.table-container {
  overflow-x: auto;
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th {
  background-color: var(--bg-subtle);
  padding: 14px 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border-color);
}

.custom-table td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.925rem;
}

.custom-table tr:last-child td {
  border-bottom: none;
}

.custom-table tr:hover {
  background-color: #f8fafc;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal-content {
  background: #ffffff;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Alerts & Notifications */
.alert {
  padding: 14px 18px;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
  font-size: 0.925rem;
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-danger {
  background-color: var(--danger-bg);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.alert-success {
  background-color: var(--success-bg);
  color: var(--success);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

/* Responsive Grid */
.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (max-width: 1024px) {
  .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .dashboard-container { flex-direction: column; }
  .dashboard-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--border-color); }
  .grid-cols-2, .grid-cols-3, .grid-cols-4 { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
`);

// --- Services & Context ---
writeFile('frontend/src/services/api.js', `import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
`);

writeFile('frontend/src/context/AuthContext.jsx', `import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Load user profile on initial app load if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data.data);
        } catch (err) {
          console.error('Failed to authenticate stored token:', err);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: receivedToken, ...userData } = res.data.data;
    
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setToken(receivedToken);
    setUser(userData);
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    const { token: receivedToken, ...registeredData } = res.data.data;

    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(registeredData));

    setToken(receivedToken);
    setUser(registeredData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
`);

// --- Components ---
writeFile('frontend/src/components/Navbar.jsx', `import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, LayoutDashboard, PlusCircle, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'Admin') return '/admin/dashboard';
    if (user.role === 'Employer') return '/employer/dashboard';
    return '/seeker/applications';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <Briefcase size={28} color="#4f46e5" />
          <span>TalentPulse</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={\`nav-link \${location.pathname === '/' ? 'active' : ''}\`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className={\`nav-link \${location.pathname === '/jobs' ? 'active' : ''}\`}>
              Browse Jobs
            </Link>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {user ? (
            <>
              <Link to={getDashboardPath()} className="btn btn-secondary btn-sm">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              
              {user.role === 'Employer' && (
                <Link to="/employer/post-job" className="btn btn-primary btn-sm">
                  <PlusCircle size={16} />
                  <span>Post a Job</span>
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: '#f1f5f9', borderRadius: '20px' }}>
                <User size={16} color="#64748b" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{user.role}</span>
              </div>

              <button onClick={handleLogout} className="btn btn-secondary btn-sm" title="Log Out">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
`);

writeFile('frontend/src/components/Footer.jsx', `import React from 'react';
import { Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 0 30px', marginTop: '60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
              <Briefcase size={26} color="#6366f1" />
              <span>TalentPulse</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Connecting high-caliber talent with top-tier companies worldwide. Built with the full MERN Stack.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>For Candidates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/jobs" style={{ color: '#94a3b8' }}>Browse All Jobs</Link></li>
              <li><Link to="/seeker/applications" style={{ color: '#94a3b8' }}>Applied Jobs Tracker</Link></li>
              <li><Link to="/register" style={{ color: '#94a3b8' }}>Create Candidate Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>For Employers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/employer/post-job" style={{ color: '#94a3b8' }}>Post Open Position</Link></li>
              <li><Link to="/employer/dashboard" style={{ color: '#94a3b8' }}>Manage Job Postings</Link></li>
              <li><Link to="/employer/applications" style={{ color: '#94a3b8' }}>Review Applications</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1rem' }}>Platform</h4>
            <p style={{ fontSize: '0.875rem', marginBottom: '12px' }}>
              Designed with MongoDB, Express, React & Node.js for modern recruitment workflows.
            </p>
            <span className="badge badge-primary">v1.0.0 Production Ready</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem' }}>
          <span>© {new Date().getFullYear()} TalentPulse Online Job Portal. All rights reserved.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Engineered with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Modern Web Standards
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
`);

writeFile('frontend/src/components/ProtectedRoute.jsx', `import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#4f46e5' }}>Loading secure session...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '12px' }}>Access Denied (403)</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            Your account role (<strong>{user.role}</strong>) does not have permission to view this page.
          </p>
          <a href="/" className="btn btn-primary">Return to Homepage</a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
`);

writeFile('frontend/src/components/DashboardLayout.jsx', `import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  FileText,
  PlusCircle,
  Users,
  Building2,
  LogOut,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div style={{ padding: '8px 12px 20px', borderBottom: '1px solid #e2e8f0', marginBottom: '12px' }}>
          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>{user?.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <span className="badge badge-primary">{user?.role}</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* Job Seeker Navigation */}
          {user?.role === 'Job Seeker' && (
            <>
              <NavLink to="/seeker/applications" className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <FileText size={18} />
                <span>My Applications</span>
              </NavLink>
              <NavLink to="/jobs" className="sidebar-link">
                <Briefcase size={18} />
                <span>Search Jobs</span>
              </NavLink>
            </>
          )}

          {/* Employer Navigation */}
          {user?.role === 'Employer' && (
            <>
              <NavLink to="/employer/dashboard" end className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <Briefcase size={18} />
                <span>Manage Jobs</span>
              </NavLink>
              <NavLink to="/employer/post-job" className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <PlusCircle size={18} />
                <span>Post New Job</span>
              </NavLink>
              <NavLink to="/employer/applications" className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <Users size={18} />
                <span>All Applicants</span>
              </NavLink>
            </>
          )}

          {/* Admin Navigation */}
          {user?.role === 'Admin' && (
            <>
              <NavLink to="/admin/dashboard" end className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <ShieldCheck size={18} />
                <span>System Overview</span>
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <Users size={18} />
                <span>Manage Users</span>
              </NavLink>
              <NavLink to="/admin/jobs" className={({ isActive }) => \`sidebar-link \${isActive ? 'active' : ''}\`}>
                <Briefcase size={18} />
                <span>Manage All Jobs</span>
              </NavLink>
            </>
          )}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-body">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
`);

writeFile('frontend/src/components/JobCard.jsx', `import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{job.jobType}</span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            <Link to={\`/jobs/\${job._id}\`} style={{ color: 'inherit' }}>
              {job.title}
            </Link>
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
            <Building2 size={16} />
            <span>{job.companyName}</span>
          </div>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={14} />
          {new Date(job.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p style={{ color: '#475569', fontSize: '0.925rem', marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {job.description}
      </p>

      {job.skills && job.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px' }}>
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      )}

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 700, fontSize: '0.95rem' }}>
            <DollarSign size={16} color="#10b981" />
            <span>{job.salary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.8rem' }}>
            <MapPin size={13} />
            <span>{job.location}</span>
          </div>
        </div>

        <Link to={\`/jobs/\${job._id}\`} className="btn btn-secondary btn-sm">
          <span>Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
`);

writeFile('frontend/src/components/ApplyModal.jsx', `import React, { useState } from 'react';
import api from '../services/api';
import { UploadCloud, CheckCircle2, AlertCircle, X } from 'lucide-react';

const ApplyModal = ({ job, onClose, onSuccess }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setError('Please select a valid PDF file for your resume.');
        setResume(null);
        return;
      }
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume in PDF format.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('coverLetter', coverLetter);

      const res = await api.post(\`/applications/apply/\${job._id}\`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onSuccess(res.data.message || 'Application submitted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Apply for Position</h2>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{job.title} at {job.companyName}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Upload Resume (PDF only) *</label>
            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '24px', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="resumeUpload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <UploadCloud size={36} color="#4f46e5" />
                <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>
                  {resume ? resume.name : 'Click to upload your resume (PDF)'}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Max file size 10MB</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Letter (Optional)</label>
            <textarea
              className="form-control"
              placeholder="Explain why you are an ideal fit for this role and your relevant accomplishments..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn btn-primary">
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
`);

// --- Pages ---
writeFile('frontend/src/pages/Home.jsx', `import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Briefcase, TrendingUp, Users, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setFeaturedJobs(res.data.data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(\`/jobs?keyword=\${encodeURIComponent(keyword)}&location=\${encodeURIComponent(location)}\`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.85rem', marginBottom: '20px' }}>
            <Sparkles size={14} style={{ marginRight: '4px' }} /> Discover 10,000+ Verified Tech Opportunities
          </span>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.2', marginBottom: '20px' }}>
            Find Your Dream Job or Hire the <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Top 1% Talent</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '40px', lineHeight: '1.6' }}>
            TalentPulse is the next-generation recruitment hub connecting ambitious software engineers, designers, and managers with hyper-growth companies.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearch} style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px' }}>
              <Search size={20} color="#64748b" />
              <input
                type="text"
                placeholder="Job title, keywords, or company..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
              />
            </div>

            <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px', borderLeft: '1px solid #e2e8f0' }}>
              <MapPin size={20} color="#64748b" />
              <input
                type="text"
                placeholder="City, State, or 'Remote'"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Search Jobs
            </button>
          </form>

          {/* Popular Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '24px', fontSize: '0.875rem', color: '#64748b' }}>
            <span style={{ fontWeight: 600 }}>Popular:</span>
            {['React', 'Node.js', 'Python', 'Full Stack', 'Remote', 'DevOps'].map((tag) => (
              <Link key={tag} to={\`/jobs?keyword=\${tag}\`} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: '20px', color: '#475569' }}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section style={{ padding: '30px 0', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4f46e5' }}>10k+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Live Job Openings</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0ea5e9' }}>5,200+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Verified Companies</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>120k+</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Active Candidates</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>98%</div>
            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>Hiring Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Hand-Picked</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Featured Opportunities</h2>
          </div>
          <Link to="/jobs" className="btn btn-secondary">
            <span>View All Jobs</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading latest opportunities...</div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#64748b' }}>No jobs posted yet. Be the first employer to list a vacancy!</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section style={{ background: '#f8fafc', padding: '70px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Built For Modern Hiring</h2>
            <p style={{ color: '#64748b' }}>Every feature engineered to streamline recruitment from application to offer.</p>
          </div>

          <div className="grid grid-cols-3">
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <TrendingUp size={24} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Precision Matching</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Filter listings by technology stack, compensation ranges, experience tiers, and remote eligibility.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Secure PDF Resumes</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Uploaded PDF resumes are stored securely and rendered cleanly for hiring managers with direct review tools.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={24} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Dedicated Dashboards</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem' }}>
                Tailored interfaces for candidates, hiring managers, and administrators with role-specific permissions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
`);

writeFile('frontend/src/pages/JobListings.jsx', `import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import JobCard from '../components/JobCard';
import { Search, MapPin, Filter, RotateCcw } from 'lucide-react';

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || 'All');
  const [experience, setExperience] = useState(searchParams.get('experience') || 'All');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (keyword) params.keyword = keyword;
      if (location) params.location = location;
      if (jobType !== 'All') params.jobType = jobType;
      if (experience !== 'All') params.experience = experience;

      const res = await api.get('/jobs', { params });
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobType, experience]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleReset = () => {
    setKeyword('');
    setLocation('');
    setJobType('All');
    setExperience('All');
    setSearchParams({});
    setTimeout(() => {
      api.get('/jobs').then((res) => setJobs(res.data.data));
    }, 50);
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Explore Job Listings
        </h1>
        <p style={{ color: '#64748b' }}>Search and filter through all currently active job postings.</p>
      </div>

      {/* Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="card" style={{ padding: '16px', marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
          <Search size={20} color="#64748b" />
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, skill, or keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
          <MapPin size={20} color="#64748b" />
          <input
            type="text"
            className="form-control"
            placeholder="Location or 'Remote'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <Search size={16} />
          <span>Search</span>
        </button>

        <button type="button" onClick={handleReset} className="btn btn-secondary" title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </form>

      {/* Layout with Filters Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        {/* Sidebar Filters */}
        <aside>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 700, fontSize: '1.1rem' }}>
              <Filter size={18} color="#4f46e5" />
              <span>Filter Results</span>
            </div>

            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select className="form-control" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Experience Tier</label>
              <select className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="All">All Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead / Executive">Lead / Executive</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Job Cards Grid */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>
              Showing {jobs.length} open position{jobs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading matching jobs...</div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-2">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No matches found</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Try broadening your search query or removing filters.</p>
              <button onClick={handleReset} className="btn btn-primary">Reset All Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListings;
`);

writeFile('frontend/src/pages/JobDetails.jsx', `import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ApplyModal from '../components/ApplyModal';
import {
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(\`/jobs/\${id}\`);
        setJob(res.data.data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'Job Seeker') {
      alert('Only candidates with a "Job Seeker" account can apply for jobs.');
      return;
    }
    setShowApplyModal(true);
  };

  const handleApplySuccess = (msg) => {
    setShowApplyModal(false);
    setSuccessMessage(msg);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 600, marginBottom: '24px' }}>
        <ArrowLeft size={16} />
        <span>Back to all jobs</span>
      </Link>

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Job Body */}
        <div>
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '10px' }}>{job.jobType}</span>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{job.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontSize: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Building2 size={18} color="#4f46e5" />
                    {job.companyName}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} />
                    {job.location}
                  </span>
                </div>
              </div>

              <button onClick={handleApplyClick} className="btn btn-primary btn-lg">
                Apply for this Position
              </button>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
              Job Description & Responsibilities
            </h2>
            <div style={{ color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {job.description}
            </div>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', color: '#0f172a' }}>
                Required Skills & Competencies
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {job.skills.map((skill, index) => (
                  <span key={index} style={{ background: '#eef2ff', color: '#4f46e5', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary Card */}
        <aside>
          <div className="card" style={{ position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              Job Overview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DollarSign size={20} color="#10b981" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Offered Salary</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.salary}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GraduationCap size={20} color="#6366f1" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Experience Level</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.experience}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Briefcase size={20} color="#0ea5e9" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Employment Type</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{job.jobType}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="#f59e0b" />
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Posted Date</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{new Date(job.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {job.deadline && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar size={20} color="#ef4444" />
                  <div>
                    <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Application Deadline</div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{new Date(job.deadline).toLocaleDateString()}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <button onClick={handleApplyClick} className="btn btn-primary btn-full">
                Apply Now
              </button>
            </div>
          </div>
        </aside>
      </div>

      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
};

export default JobDetails;
`);

writeFile('frontend/src/pages/Login.jsx', `import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Lock, Mail, AlertCircle, Check } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      const role = data.data.role;
      if (role === 'Admin') navigate('/admin/dashboard');
      else if (role === 'Employer') navigate('/employer/dashboard');
      else navigate(from === '/login' ? '/seeker/applications' : from);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  // Quick demo credentials loader
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '480px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: '#eef2ff', borderRadius: '16px', marginBottom: '12px' }}>
            <Briefcase size={32} color="#4f46e5" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Welcome Back</h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Sign in to access your recruitment portal</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg" style={{ marginTop: '10px' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
            Demo Quick Login
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => fillDemo('seeker@dev.com', 'seeker123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Job Seeker
            </button>
            <button type="button" onClick={() => fillDemo('employer@techcorp.com', 'employer123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Employer
            </button>
            <button type="button" onClick={() => fillDemo('admin@jobportal.com', 'admin123')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              Admin
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4f46e5', fontWeight: 600 }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
`);

writeFile('frontend/src/pages/Register.jsx', `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, UserCheck, Building2, AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Job Seeker');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password, role, phone });
      if (role === 'Employer') navigate('/employer/dashboard');
      else navigate('/seeker/applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', maxWidth: '520px' }}>
      <div className="card" style={{ padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Create Your Account</h1>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Join the recruitment network today</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div className="form-group">
            <label className="form-label">I want to:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                onClick={() => setRole('Job Seeker')}
                style={{
                  border: \`2px solid \${role === 'Job Seeker' ? '#4f46e5' : '#e2e8f0'}\`,
                  background: role === 'Job Seeker' ? '#eef2ff' : '#ffffff',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <UserCheck size={24} color={role === 'Job Seeker' ? '#4f46e5' : '#64748b'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: role === 'Job Seeker' ? '#4f46e5' : '#0f172a' }}>
                  Find a Job
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Candidate Profile</div>
              </div>

              <div
                onClick={() => setRole('Employer')}
                style={{
                  border: \`2px solid \${role === 'Employer' ? '#4f46e5' : '#e2e8f0'}\`,
                  background: role === 'Employer' ? '#eef2ff' : '#ffffff',
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <Building2 size={24} color={role === 'Employer' ? '#4f46e5' : '#64748b'} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: role === 'Employer' ? '#4f46e5' : '#0f172a' }}>
                  Hire Talent
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Employer Account</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{role === 'Employer' ? 'Company Representative / Name' : 'Full Name'} *</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder={role === 'Employer' ? 'e.g. Sarah Jenkins' : 'e.g. Alex Rivera'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number (Optional)</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password * (Min. 6 chars)</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg" style={{ marginTop: '10px' }}>
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
`);

// --- Seeker Pages ---
writeFile('frontend/src/pages/seeker/AppliedJobs.jsx', `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FileText, ExternalLink, Calendar, Building2, MapPin } from 'lucide-react';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        setApplications(res.data.data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="badge badge-accepted">Accepted</span>;
      case 'Rejected':
        return <span className="badge badge-rejected">Rejected</span>;
      default:
        return <span className="badge badge-pending">Pending Review</span>;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Submitted Applications</h1>
        <p style={{ color: '#64748b' }}>Track real-time statuses of all your job submissions.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading application history...</div>
      ) : applications.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title & Company</th>
                <th>Location & Type</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {app.jobId ? (
                        <Link to={\`/jobs/\${app.jobId._id}\`} style={{ color: '#4f46e5' }}>
                          {app.jobId.title}
                        </Link>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>Job Posting Closed</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {app.jobId?.companyName || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div>{app.jobId?.location || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{app.jobId?.jobType}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <FileText size={14} />
                      <span>View PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No applications submitted yet</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Start browsing open positions and apply with your resume.</p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs Now</Link>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
`);

// --- Employer Pages ---
writeFile('frontend/src/pages/employer/PostJob.jsx', `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    salary: '',
    experience: 'Mid Level',
    jobType: 'Full-time',
    skills: '',
    description: '',
    deadline: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/jobs', formData);
      navigate('/employer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Post a New Job Opportunity</h1>
        <p style={{ color: '#64748b' }}>Provide detailed criteria to attract high-caliber candidates.</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="title"
              required
              className="form-control"
              placeholder="e.g. Senior Full Stack Engineer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              name="companyName"
              required
              className="form-control"
              placeholder="e.g. TechCorp Solutions"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              name="location"
              required
              className="form-control"
              placeholder="e.g. San Francisco, CA or Remote"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salary / Compensation *</label>
            <input
              type="text"
              name="salary"
              required
              className="form-control"
              placeholder="e.g. $120,000 - $150,000 / yr"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select name="jobType" className="form-control" value={formData.jobType} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Experience Tier</label>
            <select name="experience" className="form-control" value={formData.experience} onChange={handleChange}>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Lead / Executive">Lead / Executive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Required Skills (Comma separated)</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              placeholder="e.g. React, Node.js, MongoDB, TypeScript"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              className="form-control"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Full Job Description & Requirements *</label>
          <textarea
            name="description"
            required
            rows={8}
            className="form-control"
            placeholder="Describe role responsibilities, team culture, requirements, and benefits..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
          <button type="button" onClick={() => navigate('/employer/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Publishing Job...' : 'Publish Job Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
`);

writeFile('frontend/src/pages/employer/ManageJobs.jsx', `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Briefcase, Users, PlusCircle, Trash2, Calendar, Eye } from 'lucide-react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/jobs/my/listings');
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing and its applications?')) {
      try {
        await api.delete(\`/jobs/\${jobId}\`);
        setJobs(jobs.filter((j) => j._id !== jobId));
      } catch (err) {
        alert('Failed to delete job: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>My Job Postings</h1>
          <p style={{ color: '#64748b' }}>Manage your active vacancies and review incoming candidate submissions.</p>
        </div>

        <Link to="/employer/post-job" className="btn btn-primary">
          <PlusCircle size={18} />
          <span>Post New Job</span>
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading your job postings...</div>
      ) : jobs.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location / Type</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      <Link to={\`/jobs/\${job._id}\`} style={{ color: '#4f46e5' }}>
                        {job.title}
                      </Link>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{job.salary}</div>
                  </td>
                  <td>
                    <div>{job.location}</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{job.jobType}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <Link to={\`/employer/applications?jobId=\${job._id}\`} className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <Users size={14} style={{ marginRight: '4px' }} />
                      {job.applicantCount || 0} Candidates
                    </Link>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={\`/employer/applications?jobId=\${job._id}\`} className="btn btn-secondary btn-sm" title="View Applicants">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => handleDelete(job._id)} className="btn btn-danger btn-sm" title="Delete Listing">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <Briefcase size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No active job listings</h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>You have not published any job vacancies yet.</p>
          <Link to="/employer/post-job" className="btn btn-primary">Post Your First Job</Link>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
`);

writeFile('frontend/src/pages/employer/ViewApplications.jsx', `import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Users, FileText, ExternalLink, Mail, Phone, Calendar, Check, X } from 'lucide-react';

const ViewApplications = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint = jobId ? \`/applications/job/\${jobId}\` : '/applications/employer/all';
      const res = await api.get(endpoint);
      setApplications(res.data.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await api.put(\`/applications/\${appId}/status\`, { status: newStatus });
      setApplications(
        applications.map((app) => (app._id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert('Status update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Candidate Applications</h1>
        <p style={{ color: '#64748b' }}>Review submissions, inspect PDF resumes, and update recruitment status.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading applicants...</div>
      ) : applications.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job Applied For</th>
                <th>Applied Date</th>
                <th>Resume (PDF)</th>
                <th>Current Status</th>
                <th>Decision Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{app.applicantId?.name || 'Candidate'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                      <Mail size={12} />
                      {app.applicantId?.email}
                    </div>
                    {app.applicantId?.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#64748b' }}>
                        <Phone size={12} />
                        {app.applicantId?.phone}
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#4f46e5' }}>{app.jobId?.title || 'Job Posting'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{app.jobId?.location}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <FileText size={14} />
                      <span>Review Resume</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td>
                    <span className={\`badge badge-\${app.status.toLowerCase()}\`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'Accepted')}
                        className="btn btn-sm"
                        style={{ background: '#ecfdf5', color: '#10b981', border: '1px solid #10b981' }}
                        title="Accept Application"
                      >
                        <Check size={14} />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                        className="btn btn-sm"
                        style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #ef4444' }}
                        title="Reject Application"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <Users size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No applicants found</h3>
          <p style={{ color: '#64748b' }}>No candidates have applied for this listing yet.</p>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
`);

// --- Admin Pages ---
writeFile('frontend/src/pages/admin/AdminDashboard.jsx', `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Users, Briefcase, FileText, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/applications/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error('Error fetching admin metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>System Administration Portal</h1>
        <p style={{ color: '#64748b' }}>Overview of platform users, job postings, and active applications.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading system metrics...</div>
      ) : (
        <>
          <div className="grid grid-cols-4" style={{ marginBottom: '32px' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Users</span>
                <Users size={20} color="#4f46e5" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalUsers || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                {stats?.totalSeekers} Seekers • {stats?.totalEmployers} Employers
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Jobs</span>
                <Briefcase size={20} color="#0ea5e9" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalJobs || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Across all companies</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Applications</span>
                <FileText size={20} color="#10b981" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalApplications || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Submissions recorded</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Companies</span>
                <Building2 size={20} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalCompanies || 0}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Registered organizations</div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>User Management</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '20px' }}>
                Review all registered candidates, employers, and administrator accounts. Delete or audit credentials.
              </p>
              <Link to="/admin/users" className="btn btn-primary">
                <span>Manage Users</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>Job Moderation</h3>
              <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '20px' }}>
                Inspect all job listings posted platform-wide. Moderate content or remove non-compliant listings.
              </p>
              <Link to="/admin/jobs" className="btn btn-primary">
                <span>Manage All Jobs</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
`);

writeFile('frontend/src/pages/admin/ManageUsers.jsx', `import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Trash2, Mail, Phone, Calendar, Shield } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        await api.delete(\`/auth/users/\${userId}\`);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        alert('Failed to delete user: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Platform User Directory</h1>
        <p style={{ color: '#64748b' }}>Manage all candidate and employer registrations.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading user registry...</div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{u.role}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>{u.phone || 'No phone'}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    {u.role !== 'Admin' && (
                      <button onClick={() => handleDelete(u._id)} className="btn btn-danger btn-sm" title="Delete User">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
`);

writeFile('frontend/src/pages/admin/ManageAllJobs.jsx', `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Briefcase, Trash2, Calendar, Users, Eye } from 'lucide-react';

const ManageAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/admin/all');
      setJobs(res.data.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (window.confirm('Delete this job posting and all associated candidate applications?')) {
      try {
        await api.delete(\`/jobs/\${jobId}\`);
        setJobs(jobs.filter((j) => j._id !== jobId));
      } catch (err) {
        alert('Failed to delete job: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>All Platform Job Postings</h1>
        <p style={{ color: '#64748b' }}>Moderate content and inspect vacancies across all employers.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading all job postings...</div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Title & Company</th>
                <th>Posted By</th>
                <th>Location / Type</th>
                <th>Applicants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      <Link to={\`/jobs/\${job._id}\`} style={{ color: '#4f46e5' }}>
                        {job.title}
                      </Link>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{job.companyName}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.9rem', color: '#0f172a' }}>{job.postedBy?.name || 'N/A'}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{job.postedBy?.email}</div>
                  </td>
                  <td>
                    <div>{job.location}</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{job.jobType}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      {job.applicantCount || 0} Applications
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={\`/jobs/\${job._id}\`} className="btn btn-secondary btn-sm" title="View Public Page">
                        <Eye size={14} />
                      </Link>
                      <button onClick={() => handleDelete(job._id)} className="btn btn-danger btn-sm" title="Delete Job">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAllJobs;
`);

// --- Main App & Router ---
writeFile('frontend/src/App.jsx', `import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';

// Job Seeker Pages
import AppliedJobs from './pages/seeker/AppliedJobs';

// Employer Pages
import PostJob from './pages/employer/PostJob';
import ManageJobs from './pages/employer/ManageJobs';
import ViewApplications from './pages/employer/ViewApplications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAllJobs from './pages/admin/ManageAllJobs';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Job Seeker Protected Routes */}
          <Route
            path="/seeker"
            element={
              <ProtectedRoute allowedRoles={['Job Seeker']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/seeker/applications" replace />} />
            <Route path="applications" element={<AppliedJobs />} />
          </Route>

          {/* Employer Protected Routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={['Employer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<ManageJobs />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="applications" element={<ViewApplications />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="jobs" element={<ManageAllJobs />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
`);

writeFile('frontend/src/main.jsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
`);

console.log('\n✨ ==============================================================');
console.log('🎉 Full-Stack MERN Online Job Portal Codebase Generated!');
console.log('==============================================================');
console.log('Next Steps:');
console.log('1. Run `npm run install-all` to install all backend and frontend packages.');
console.log('2. Ensure MongoDB is running locally or set MONGODB_URI in backend/.env.');
console.log('3. Run `npm run dev` to start both servers simultaneously.');
console.log('==============================================================\n');
