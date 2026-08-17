const express = require('express');
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
