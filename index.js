const express = require('express');
const app = express();

const {application_DB, oneTimePass_DB} = require('./utils/startup/db');
application_DB
oneTimePass_DB
require('./utils/startup/routes')(app)
const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`listening on port ${port}....`)
});
