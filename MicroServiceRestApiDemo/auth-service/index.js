const express = require("express");
const app = express();
require("./dbconfig/database");
const cors = require("cors");
const logger = require("morgan");
require('dotenv').config();
const PORT = process.env.PORT || 7070;
const HOST = process.env.HOST || "localhost";
const userRoute = require('./routes/user.route');


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/',userRoute);

app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});
