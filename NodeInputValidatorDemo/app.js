const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
require("./dbconfig/database");
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const personRoute = require('./routes/person.routes');

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/api/v1/persons',personRoute);


app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
})