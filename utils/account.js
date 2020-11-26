const axios = require('axios')
const config = require('../config/config').get(process.env.NODE_ENV)

const url = 'https://sandbox.monnify.com/api/v1/bank-transfer/reserved-accounts';

const token = "";

function account(_id, firstname,lastname, email){

  const options = {
    headers: {
      'Authentication': `Bearer Token ${token}`,
      'Content-Type': 'application/json'
    }
  }

  const data = {
    "accountReference": _id,
    "accountName": `${firstname} ${lastname}`,
    "currencyCode": "NGN",
    "contractCode": "6297872736",
    "customerEmail": email,
    "customerName": lastname
  }
  axios.post(url, data, options)
  .then(response => {
    let accountNumber = response.data.responseBody.accountNumber;
    console.log(accountNumber)
    return accountNumber
  })
  .catch(function(error){
    console.log(error.response.data)
  })

}

module.exports = account;
