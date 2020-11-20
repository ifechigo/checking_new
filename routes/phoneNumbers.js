const verifyPhone = require('../utils/verifyPhone');
const authLoggedIn = require('../middlewares/authLoggedIn');
const express = require('express');
const user = require('../models/user');
const router = express.Router()
const OTP = require('../models/oneTimePassword')

router.post('/verifyphonenumber', authLoggedIn, async (req, res) => {
  const enteredPhoneNumber = req.body.phone_number

  if (enteredPhoneNumber == undefined || enteredPhoneNumber == null ) return res.status(400).send('enter a phone number')

  const otp = await verifyPhone(enteredPhoneNumber)
  
  await user.otp = otp
  
})