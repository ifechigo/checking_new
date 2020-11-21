const verifyPhone = require('../utils/verifyPhone');
const authLoggedIn = require('../middlewares/authLoggedIn');
const express = require('express');
//const {User} = require('../models/user');
const router = express.Router()
const OTP = require('../models/oneTimePassword');
const user = require('../models/user');

router.post('/verifyphonenumber', authLoggedIn, async (req, res) => {

  const enteredPhoneNumber = req.body.phone_number

  if (enteredPhoneNumber == undefined || enteredPhoneNumber == null ) return res.status(400).send('enter a phone number')
  
  await verifyPhone(enteredPhoneNumber, otp)
  
  const sent_otp = await new OTP(req.user)

  sent_otp.save()
  
});

router.post('/enter_otp_sent_to_phone', authLoggedIn, (req, res) => {

  let user = await OTP.findOne({'user_id': req.user._id});

  if(!user) return console.log('your otp has expired');

  user = await OTP.findOne({'otp': req.body.otp});

  if(!user) return console.log('the otp you entered isnt valid');

  await user.phone(phone)

  await user.save()

  res.sendStatus(200).send(req.user.phone)

});



module.exports = router
