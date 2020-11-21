const twilio = require('twilio');
//const config = require('../config/config').get(process.env.NODE_ENV)

const sid = config.TWILIO_SID;
const token = config.TWILIO_TOKEN;

const client = new twilio(sid, token)



//===============================================================================
const mongoose = require('mongoose')

function ha(){ 
  var conn2 = mongoose.createConnection('mongodb://localhost:27017/testB', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    return err ? console.log(err) : console.log('database is established B....')
  })
  return conn2
}

const conn2 = ha()


// stored in 'testB' database
var ModelB    = conn2.model('Model', new mongoose.Schema({
  name: {
    default: 'ifechigo',
    type: String
  },
  otp: {
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 3000
    }
  }
}));

//===============================================================================

// for(var i = 0; i < 6; i++){
//   let j = Math.floor(Math.random() * 10);
//   mylist.push(j);
// }

// const otp = mylist.join('')

async function verifyPhone(phone){
  const mylist = [];
  for(var i = 0; i < 6; i++){
    let j = Math.floor(Math.random() * 10);
    mylist.push(j);
  }
  
  let otp = mylist.join('')
  console.log("=====================>",otp);
  try{
    const response = await client.messages.create({
      body: `OTP:\n your otp is ${otp}`,
      to: phone,
      from: '+13344234718'
    });
    console.log("=>",response.sid);
    console.log("====>>>",otp);
    return otp;
  }catch(error){ 
    console.log(error);
  }
}

async function sendOTP(){
  let otp = verifyPhone('+2348159749599');

  console.log("=>>",otp)

  /*let user = await new ModelB({
    otp: otp
  })*/

  //await user.save()
}


sendOTP()

const rand = Math.floor(Math.random())
//module.exports = verifyPhone