const express = require('express');
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
