const twilio = require('twilio');
//const config = require('../config/config').get(process.env.NODE_ENV)

const sid = 'AC7e540106231e3e98cc9cb0b4052a187b' //config.TWILIO_SID;
const token = '0ad111fccfbf00543838701255f22102' //config.TWILIO_TOKEN;

const client = new twilio(sid, token)

const mylist = []

for(var i = 0; i < 6; i++){
  let j = Math.floor(Math.random() * 10);
  mylist.push(j);
}

const otp = mylist.join('')

function verifyPhone(phone){

  //const otp = mylist.join('')

  client.messages.create({
    body: `OTP:\n your otp is ${otp}`,
    to: phone,
    from: '+13344234718'
  })
  .then((message) => {
    console.log(message.sid)
    return otp;
  })
  .catch(err => console.log(err))
}


module.exports = verifyPhone