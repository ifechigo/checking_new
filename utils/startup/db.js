const mongoose = require('mongoose');
const db = require('../../config/config').get(process.env.NODE_ENV)

module.exports = async function(){
  mongoose.Promise = global.Promise;
  const applicationDB = await mongoose.createConnection('mongodb://localhost:27017/testA', );
  await mongoose.connect(db.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true},
    function(err){
    return err ? console.log(err) : console.log('database is established....')}
  )
}
