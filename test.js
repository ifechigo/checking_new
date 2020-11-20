
const mongoose = require('mongoose')

// mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/delete-db-from-here', {useUnifiedTopology: true, useNewUrlParser: true}, function(err){ return err ? console.log(err) : console.log('database is connected........')})

// const nameSchema = new mongoose.Schema({
//   name: {
//     default: 'ifechigo',
//     type: String
//   },
//   expireAt: {
//     type: Date,
//     default: Date.now,
//     index: {
//       expires: 1000
//     }
//   }
// })


// const Name = mongoose.model('Name', nameSchema)

// let name = new Name()
// name.save(error => console.log(error))
function ma(){
  mongoose.Promise = global.Promise
  var conn      = mongoose.createConnection('mongodb://localhost:27017/testA', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    return err ? console.log(err) : console.log('database is established A ....')
  });
    return conn
  }
function ha(){ 
  var conn2     = mongoose.createConnection('mongodb://localhost:27017/testB', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    return err ? console.log(err) : console.log('database is established B....')
  })
  return conn2
}

const conn = ma()
const conn2 = ha()


// stored in 'testA' database
var ModelA    = conn.model('Model', new mongoose.Schema({
  title : { type : String, default : 'model in testA database' }
}));



// stored in 'testB' database
var ModelB    = conn2.model('Model', new mongoose.Schema({
  name: {
    default: 'ifechigo',
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 1000
    }
  }
}));

let modela = new ModelA()
let modelb = new ModelB()

modela.save()
modelb.save()
