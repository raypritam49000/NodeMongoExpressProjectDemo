const gateway = require('fast-gateway');
const PORT = 9999;

const server = gateway({
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:9090',
          //  middlewares: [],
            hooks: {

            }
        },
        {
            prefix: '/product',
            target: 'http://localhost:8081',
          //  middlewares: [],
            hooks: {

            }
        },
        {
            prefix: '/authentication',
            target: 'http://localhost:7070',
            hooks: {

            }
        }
    ]
});

server.start(PORT).then(() => {
    console.log("Api Gateway running at " + PORT);
})