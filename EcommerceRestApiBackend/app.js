const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
require('./dbconfig/database');
const cors = require('cors');
const userRoute = require('./routes/user.route.js')
const productRoute = require('./routes/product.route.js');
const cartRoute = require('./routes/cart.route.js');
const orderRoute = require('./routes/order.route.js');
const paymentRoute = require('./routes/stripe.route');
const logger = require('morgan');

app.use(logger('dev'));
app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', userRoute);
app.use('/api/products/',productRoute);
app.use('/api/carts/',cartRoute);
app.use('/api/orders/',orderRoute );
app.use('/api/orders/',paymentRoute)

app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
})



