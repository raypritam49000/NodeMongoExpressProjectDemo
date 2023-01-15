const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
require('./dbconfig/database');
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || 'localhost';
const orderRoute = require('./routes/order.route');

app.use(logger('dev'));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/orders',orderRoute);


app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
})


