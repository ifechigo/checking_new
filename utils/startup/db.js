const mongoose = require('mongoose');
const db = require('../../config/config').get(process.env.NODE_ENV);
const otp_db = require('../../config/config').get(process.env.OTP_DATABASE);

mongoose.Promise = global.Promise;

const app_DB = async function (){
  const app_DB = await mongoose.createConnection(db, {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
      return err ? console.log('APPLICATION database crashed....', err) 
      : console.log('APPLICATION database is established....')
    }
  );
  return app_DB
}

const otp_DB = async function (){
  const otp_DB = await mongoose.createConnection(otp_db, {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
      return err ? console.log('OTP database crashed....', err) 
      : console.log('OTP database is established....')
    }
  );
  return otp_DB
}

module.exports = {app_DB, otp_DB}

