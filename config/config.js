const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URL
  },
  default: {
    SECRET: 'mysecretkey', //should be an enviroment variable
    DATABASE: 'mongodb://localhost:27017/node-eight-user', //should be an enviroment variable
    OTP_DATABASE = 'mongodb://localhost:27017/node-eight-otp',
    SALT: 10,
    AXIOS_TOKEN: '',
    AXIOS_URL: 'https://sandbox.monnify.com/api/v1/bank-transfer/reserved-accounts',
    TWILIO_SID: 'AC7e540106231e3e98cc9cb0b4052a187b',
    TWILIO_TOKEN: '0ad111fccfbf00543838701255f22102'

  }
}

exports.get = function get(env){
  return config[env] || config.default
}