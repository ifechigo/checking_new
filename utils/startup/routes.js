const express = require('express');
const users = require('../../routes/users');
const accounts = require('../../routes/accounts');
const cookieParser = require('cookie-parser');
const phone = require('../../routes/phoneNumbers')
const app = express()

module.exports = function(app){
  app.use(express.json());
  app.use(cookieParser());
  
  app.use('/api', users);
  app.use('/api/user', accounts);
  app.use('/api/user/phone', phone)
}