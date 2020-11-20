const express = require('express');
const app = express();
const db = require('./config/config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');

require('./utils/startup/db')();
require('./utils/startup/routes')(app)

const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`listening on port ${port}....`)
});

