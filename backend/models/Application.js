const mongoose = require('mongoose');

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
