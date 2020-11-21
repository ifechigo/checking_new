const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URL
  },
  default: {
    SECRET: 'mysecretkey',
    DATABASE: 'mongodb://localhost:27017/node-eight-user',
    OTP_DATABASE: 'mongodb://localhost:27017/node-eight-otp',
    SALT: 10,
    AXIOS_TOKEN: process.env.AXIOS_TOKEN,
    AXIOS_URL: 'https://sandbox.monnify.com/api/v1/bank-transfer/reserved-accounts',
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN

  }
}

exports.get = function get(env){
  return config[env] || config.default
}