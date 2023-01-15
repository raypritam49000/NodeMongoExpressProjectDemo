const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 7000;
const HOST = process.env.HOST || 'localhost';
const cors = require('cors');
require('./databaseConfig/db.config');
const bookRoutes = require('./routes/book.routes');
const logger = require('morgan');

app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/books/',bookRoutes);


app.listen(PORT,HOST,()=>{
    console.log(`Server are running at http://${HOST}:${PORT}`);
})