const twilio = require('twilio');

const sid = config.TWILIO_SID;
const token = config.TWILIO_TOKEN;

const client = new twilio(sid, token)

async function verifyPhone(phone, otp){
  try{
    const response = await client.messages.create({
      body: `OTP:\n your otp is ${otp}`,
      to: phone,
      from: '+13344234718'
    });
    return console.log("=>",response.sid);
    
  }catch(error){ 
    console.log(error);
  }
}


module.exports = verifyPhone;

