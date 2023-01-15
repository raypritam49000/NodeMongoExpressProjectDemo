const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const logger = require('morgan');
const bodyParser = require('body-parser');
require('./dbconfig/database');
const fileUpload = require('express-fileupload');

const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/profile.routes');
const blogRoute = require('./routes/blog.routes');
const categoryRoute = require('./routes/category.routes');
const commentRoute = require('./routes/blog.comment.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors({ origin: "*" }))
app.use(logger('dev'))
app.use(fileUpload());

global.publicPath = __dirname + '/public';

app.use(express.static(__dirname + '/public'))
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);
app.use('/api/category', categoryRoute);
app.use('/api/comment',commentRoute);

app.listen(PORT, HOST, () => {
    console.log(`Server are Running at http://${HOST}:${PORT}`);
})