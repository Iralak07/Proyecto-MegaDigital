const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Proyecto API documentation',
        description: 'API documentation'
    },
    host: 'localhost:3001',
};

const routes = ['./index.ts',]

const outputFile = './swagger-output.json';

swaggerAutogen(outputFile, routes, doc);
