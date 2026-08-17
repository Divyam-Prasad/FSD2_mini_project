const mongoose = require('mongoose');

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
