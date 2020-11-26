const express = require('express');
const router = express.Router();
const authLoggedIn = require('../middlewares/authLoggedIn')


const {User, validateUser} = require('../models/user');

router.post('/register', async (req, res) => {

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password != req.body.confirm_password) return res.status(400).send('passwords do not match');

  let user = await User.findOne({email: req.body.email});

  if (user) return res.status(400).send('email already exists');

  user = await User.findOne({bvn: req.body.bvn});

  if (user) return res.status(400).send('bvn already exists');

  user = new User(req.body);

  await user.save();

  return res.status(200).send(user)

})

router.post('/login', async (req, res) => {
  
  let token = req.cookies.auth;

  User.findByToken(token, (err, user)=>{

    if(err) return res(err);
    
    if(user) return res.status(400).json({
      error :true,
      message:"You are already logged in"
    });
    else{
      User.findOne({'email': req.body.email}, function(err, user){
        if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});

        user.comparePassword(req.body.password, (err, isMatch)=>{
          if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});

          user.generateToken((err, user)=>{
            if(err) return res.status(400).send(err);
            res.cookie('auth', user.token).json({
              isAuth : true,
              id : user._id,
              email : user.email
            });
          });
        });
      });
    }
  });
})

router.get('/user', authLoggedIn, async (req, res) => {
  res.status(200).send(req.user)
})

router.get('/logout', authLoggedIn, async (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {

    return err ? res.status(400).send(err) : res.status(200).send('youre logged out');

  })
})

module.exports = router