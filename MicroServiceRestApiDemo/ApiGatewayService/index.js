const gateway = require('fast-gateway');
require('dotenv').config();
const PORT = process.env.PORT || 9998;
const HOST = process.env.HOST || 'localhost';
const isAuthenticated = require('./isAuthenticated');

const server = gateway({
    routes: [
        {
            target: 'http://localhost:4000',
            prefix: '/order-service',
            middlewares: [isAuthenticated],
        },
        {
            target: 'http://localhost:3000',
            prefix: '/book-service',
            middlewares: [isAuthenticated]
        },
        {
            target: 'http://localhost:5000',
            prefix: '/auth-service',
        }
    ]
});

server.start(PORT).then(() => {
    console.log(`Api Gateway running at http://${HOST}:${PORT}`);
})