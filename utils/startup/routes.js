const express = require('express');
const users = require('../../routes/users');
const accounts = require('../../routes/accounts');
const cookieParser = require('cookie-parser');


module.exports = function(app){
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', users);
  app.use('/api/users', accounts);

}