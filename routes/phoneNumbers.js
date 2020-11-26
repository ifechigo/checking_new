const verifyPhone = require('../utils/verifyPhone');
const authLoggedIn = require('../middlewares/authLoggedIn');
const express = require('express');
//const {User} = require('../models/user');
const router = express.Router()
const OTP = require('../models/oneTimePassword');
const user = require('../models/user');

router.post('/verifyphonenumber', authLoggedIn, async (req, res) => {

  const mylist = [];
  for(var i = 0; i < 6; i++){
    let j = Math.floor(Math.random() * 10);
    mylist.push(j);
  }

  let otp = mylist.join('')

  const enteredPhoneNumber = req.body.phone_number

  if (enteredPhoneNumber == undefined || enteredPhoneNumber == null ) return res.status(400).send('enter a phone number')
  
  await verifyPhone(enteredPhoneNumber, otp)
  
  const sent_otp = await new OTP({
    user_id: req.user._id,
    phone: enteredPhoneNumber,
    otp: otp
  })

  sent_otp.save()
  
});

router.post('/verifyphonenumber/enterotp', authLoggedIn, async (req, res) => {

  let user_otp = await OTP.findOne({'user_id': req.user._id});

  if(!user_otp) return console.log('your otp has expired');

  user_otp = await OTP.findOne({'otp': req.body.otp});

  if(!user_otp) return console.log('the otp you entered isnt valid');

  let phone = user_otp.phone;

  await user.phone(phone)

  await user.save()

  console.log('your phone  number has been verified')

  res.status(200).send(req.user.phone)

});

module.exports = router
