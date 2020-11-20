const mongoose = require('mongoose');
const {otp_DB} = require('../utils/startup/db')

const otpSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  email: {
    type: String
  },
  otp: {
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '2m'
    }
  }
})

const OTP = otp_DB.model('OTP', otpSchema);

module.exports = OTP