const express = require('express');
const router = express.Router();

const account = require('../utils/account');
const authLoggedIn = require('../middlewares/authLoggedIn');


router.post('/createaccount', authLoggedIn, async (req, res) => {
  const { firstname, lastname, _id, email} = req.user

  let accountNumber = await account(firstname, lastname, _id, email)

  accountnumber = accountNumber

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

module.exports = router