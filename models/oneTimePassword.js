const mongoose = require('mongoose');
const {oneTimePass_DB} = require('../utils/startup/db')

const otpSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  phone: {
    type: String
  },
  otp: {
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '4m'
    }
  }
})

const OTP = oneTimePass_DB.model('OTP', otpSchema);

module.exports = OTP