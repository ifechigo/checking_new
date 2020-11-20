const {User} = require('../models/user')

module.exports = function authLoggedIn(req, res, next){
  let token = req.cookies.auth

  User.findByToken(token, (error, user) => {
    if(error) throw error;

    if(!user) return res.status(400).send('you are not logged in');

    req.token = token;
    req.user = user;
    next()
  })

}