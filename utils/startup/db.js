const mongoose = require('mongoose');
const db = require('../../config/config').get(process.env.NODE_ENV);
const otp_db = require('../../config/config').get(process.env.OTP_DATABASE);

mongoose.Promise = global.Promise;

function app_DB(){
  const app_DB = mongoose.createConnection(db.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
      return err ? console.log('APPLICATION database crashed....', err) 
      : console.log('APPLICATION database is established....')
    });
  return app_DB
}

function otp_DB(){
  const otp_DB = mongoose.createConnection(otp_db.OTP_DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err) {
      return err ? console.log('OTP database crashed....', err) 
      : console.log('OTP database is established....')
    }); 
  return otp_DB
}


const application_DB = app_DB()
const oneTimePass_DB = otp_DB()

module.exports = { application_DB, oneTimePass_DB}

//console.log(application_DB, oneTimePass_DB)

