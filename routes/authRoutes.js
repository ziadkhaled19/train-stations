const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.patch('/updatedetails', protect, updateDetails);
router.patch('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:resettoken', resetPassword);

module.exports = router;

