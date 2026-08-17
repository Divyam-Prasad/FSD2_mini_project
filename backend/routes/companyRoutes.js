const express = require('express');
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
