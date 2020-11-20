const axios = require('axios')
const config = require('../config/config').get(process.env.NODE_ENV)

const url = config.AXIOS_URL;

const token = config.AXIOS_TOKEN;

const options = {
  headers: {
    'Authentication': `Bearer ${token}`
  }
}

function account(firstname, lastname, _id, email){
  const data = {
    "accountReference": _id,
    "accountName": firstname + ' ' + lastname,
    "currencyCode": "NGN",
    "contractCode": phone,
    "customerEmail": email,
    "customerName":  lastname
  }
  axios.post(url, data, options)
  .then(response => {
    let accountNumber = response.data.responseBody.accountNumber;
    console.log(accountNumber)
    return accountNumber
  })
  .catch(error => console.log(error))

}

module.exports = account;

