const express = require('express');
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
