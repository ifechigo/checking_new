const express = require('express');
const app = express();

const {app_DB, otp_DB} = require('./utils/startup/db');

app_DB()
otp_DB()
require('./utils/startup/routes')(app)

const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`listening on port ${port}....`)
});

