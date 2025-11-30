const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { sendOTP } = require('../utils/sms');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    
    let admin = await Admin.findOne({ $or: [{ phone }, { username }] });
    if (admin) {
      await Admin.deleteOne({ _id: admin._id });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY));

    admin = new Admin({ username, phone, password, otp, otpExpiry });
    await admin.save();

    await sendOTP(phone, otp);
    console.log(`OTP sent to ${phone}: ${otp}`);
    
    res.json({ message: 'Registration successful. OTP sent.', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { adminId, otp } = req.body;
    
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, admin: { id: admin._id, username: admin.username, phone: admin.phone } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, admin: { id: admin._id, username: admin.username, phone: admin.phone } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/resend-otp', async (req, res) => {
  try {
    const { adminId } = req.body;
    
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY));

    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    await admin.save();

    await sendOTP(admin.phone, otp);
    console.log(`OTP resent to ${admin.phone}: ${otp}`);
    
    res.json({ message: 'OTP resent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
