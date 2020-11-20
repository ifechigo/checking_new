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

  let user = await User.findByToken(token, (error, user) => {
    if(user) return res.status(400).send('you are already logged in');
  });

  user = await User.findOne({'email': req.body.email});

  if(!user) return res.status(400).send('Auth failed, email not found');

  user.comparePassword(req.body.password, function(err, isMatch){
    if(!isMatch) return res.status(400).send('password doesnt match');
  })

  user.generateToken((error, user) => {
    if(error) return res.status(400).send(error);
  })
  
  res.cookie('auth', user.token).json({
      isAuth: true,
      id: user._id,
      email: user.email
    })
})

router.get('/me', authLoggedIn, async (req, res) => {
  res.status(200).send(req.user)
})

router.get('/logout', authLoggedIn, async (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {

    return err ? res.status(400).send(err) : res.sendStatus(200);

  })
})

module.exports = router