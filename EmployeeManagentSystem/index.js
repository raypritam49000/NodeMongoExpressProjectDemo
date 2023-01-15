const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
// const Employee = require("./models/employee.model");
const sequelize = require("./dbconfig/database");
const employeeRoute = require('./routes/employee.routes');

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Employee.sync({force: false});
sequelize.sync({force: false});

app.use('/api/v1/employees',employeeRoute);

app.listen(PORT, HOST, () => {
    console.log(`Server are listening on http://${HOST}:${PORT}`);
})
