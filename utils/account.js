const axios = require('axios')
const config = require('../config/config').get(process.env.NODE_ENV)

const url = 'https://sandbox.monnify.com/api/v1/bank-transfer/reserved-accounts';

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibW9ubmlmeS1wYXltZW50LWVuZ2luZSJdLCJzY29wZSI6WyJwcm9maWxlIl0sImV4cCI6MTYwNTg4OTEyNywiYXV0aG9yaXRpZXMiOlsiTVBFX01BTkFHRV9MSU1JVF9QUk9GSUxFIiwiTVBFX1VQREFURV9SRVNFUlZFRF9BQ0NPVU5UIiwiTVBFX0lOSVRJQUxJWkVfUEFZTUVOVCIsIk1QRV9SRVNFUlZFX0FDQ09VTlQiLCJNUEVfQ0FOX1JFVFJJRVZFX1RSQU5TQUNUSU9OIiwiTVBFX1JFVFJJRVZFX1JFU0VSVkVEX0FDQ09VTlQiLCJNUEVfREVMRVRFX1JFU0VSVkVEX0FDQ09VTlQiLCJNUEVfUkVUUklFVkVfUkVTRVJWRURfQUNDT1VOVF9UUkFOU0FDVElPTlMiXSwianRpIjoiYTU4NmZmMWUtN2Q1My00ZmQ1LWI1ZTgtZWIwZDM4Zjk4ZmUxIiwiY2xpZW50X2lkIjoiTUtfVEVTVF9VR1pSTlpONlQ2In0.gzVPlrTUsODPAutPvqhPDnoFhuqDcCDHSZFG7U9GDgXDvaeh5g3PGB6ThkZqe4MX6PiB0oetjtcXiJQuH6ATBCxoADREftMdpkC5JzV-OvsgncMoaN1gcq_LRUz42AkogDk-36ZexKH56w6sUWRU2NovClqr3ouESEPl-0-AkCkxLC-F8isjfe5q27sARXMJjJiomIZGJzvAkT58Q66BWpx6gtNuPzohVIZhEVHHzNKLFFF1TN7i6jywd_YaUCd7FooIxG9jJg8drUNT2X6hHcJNe2QapaHZrbJvtmPLKR4QzZ3v56UCT3nCO_gZ02moYdCXbCEktKoGo_Zswbb4sg"


let firstname = 'cjewiwnc'
let lastname = 'cjewiwnc'
let email = 'cjewiwnc'
let _id = 'cjewiwnc'
let phone = '-09876567890'


function account(){

  const options = {
    headers: {
      'Authentication': `Bearer Token ${token}`,
      'Content-Type': 'application/json'
    }
  }

  const data = {
    "accountReference": "jnihvgfkig5677654edd24565chbkuryd6u5d",
    "accountName": "Reserved account",
    "currencyCode": "NGN",
    "contractCode": "6297872736",
    "customerEmail": "texty@texter.com",
    "customerName": "Sammy Doe"
  }
  axios.post(url, data, options)
  .then(response => {
    let accountNumber = response.data.responseBody.accountNumber;
    console.log('=================+++++++=======================')
    console.log(accountNumber)
    console.log('=====================+++++++===================')
    return accountNumber
  })
  .catch(function(error){
    console.log('==============================================')
    console.log(error.response.data)
    console.log('==============================================')
  })

}
//account()
//module.exports = account;

axios({
  method: 'post',
  url: 'https://sandbox.monnify.com/api/v1/bank-transfer/reserved-accounts',
  data: {
    "accountReference": "jnihvgfkig5677654edd24565chbkuryd6u5d",
    "accountName": "Reserved account",
    "currencyCode": "NGN",
    "contractCode": "6297872736",
    "customerEmail": "texty@texter.com",
    "customerName": "Sammy Doe"
  },
  options: {
    headers: {
      'Authentication': `Bearer Token ${token}`
    }
  }
}).then(response => {
  let accountNumber = response.data.responseBody.accountNumber;
  console.log('=================+++++++=======================')
  console.log(accountNumber)
  console.log('=====================+++++++===================')
  return accountNumber
})
.catch(function(error){
  console.log('==============================================')
  console.log(error.response.data)
  console.log('==============================================')
})

