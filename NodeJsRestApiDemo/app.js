const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
require('./dbconfig/database');
const cors = require('cors');
const userRoute = require('./routes/user.route.js')
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const option = {
    definition: {
        tags: [
            {
                name: "User Rest Api for MongoDB",
                "description": "User Rest Api for MongoDB"
            }
        ],
        openapi: '3.0.0',
        info: {
            title: 'Node JS API Project for mongodb',
            version: '1.0.0',
            description: 'User Rest Api for mongodb'
        },
        servers: [
            {
                url: 'http://localhost:9999/'
            }
        ]
    },
    apis: [`./routes/user.route.js`]
}

const swageerSpec = swaggerJSDoc(option);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swageerSpec));

app.use(logger('dev'));
app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/rest/api', userRoute);



app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
})



