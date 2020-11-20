const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const {app_DB} = require('../utils/startup/db')

//const salt = 10;

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  bvn: {
    type: String,
    trim: 1,
    unique: true
  },
  dateofbirth: {
    type: String
  },
  accountNumber: {
    type: String,
    trim: true
  },
  phone: {
    type: String
  },
  phone: {
    type: String,
    
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
}, { timestamps: true });

userSchema.pre('save' ,async function(next){

  let user = this;

  if(user.isModified('password')){

    let salt = await bcrypt.genSalt(config.SALT)

    user.password = await bcrypt.hash(user.password, salt)

  } else {

    next();

  }
});

userSchema.methods.generateToken = function(cb){

  let user = this;
  let token = jwt.sign(user._id.toHexString(), config.SECRET)
  
  user.token = token;
  user.save((error, user) => {
    if(error) return cb(error);
    cb(null, user);
  });
};

userSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return cb(next);
    cb(null, isMatch);
  });
};

userSchema.statics.findByToken = function(token, cb){
  let user = this;

  jwt.verify(token, config.SECRET, function(err, decode){
    user.findOne({'_id': decode, 'token': token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.methods.deleteToken = function(token, cb) {

  let user = this;

  user.update({$unset: {token: 1}}, function(error, user){
    if(error) return cb(error);
    cb(null, user);
  });
};

function validateUser(user){
  const schema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(8).max(255).required(),
    bvn: Joi.string().min(8).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    confirm_password: Joi.string().min(8).max(255).required()
  }
  return Joi.validate(user, schema)
}

const User = app_DB.model('User', userSchema)

module.exports = { User, validateUser }