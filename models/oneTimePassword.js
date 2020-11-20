const mongoose = require('mongoose');
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

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP