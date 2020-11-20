const express = require('express');
const router = express.Router();

const account = require('../utils/account');
const authLoggedIn = require('../middlewares/authLoggedIn');
const {User} = require('../models/user');
const accountNumber = require('../../node7/utilities/accountNumber');
const { route } = require('./users');


router.post('/createaccount', authLoggedIn, async (req, res) => {
  const { firstname, lastname, _id, email} = req.user

  await account(firstname, lastname, _id, email)

  const accountnumber = accountNumber

  await user.findOneAndUpdate({$accountNumber: accountnumber})

  user.save();

  res.status(200).send(user)

})

router.get('/myaccount', authLoggedIn, async (req, res) => {
  res.json({
    isAuth: true,
    account_number: req.user.account
  })
})