const env = require("dotenv").config();
// eslint-disable-next-line no-undef
const swaggerDoc = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/bookRoutes.js', './routes/publisherRoutes.js']; 

const doc = {
  info: {
    title: 'REST API for Book Store', 
    description: ' This is a REST API for CSE341 course. The purpose of this API is to provide a way to manage Books and their Publishers. This API will allow you to create, read, update, and delete Books and their Publishers. This API is built using Node.js, Express, and MongoDB. The API is hosted on Render and the database is hosted on MongoDB Atlas. The API is secured using JWT tokens. The API is documented using Swagger. The API is tested using Postman. The API is deployed using GitHub Actions', 
  },
  host: "bookstore-s1zp.onrender.com", // Change to your host and port
  basePath: '/', // Important: Set the base path to /books
  schemes: ['https'], // Change to https if you're using https
  securityDefinitions: {
  bearerAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
    description: 'JWT Authorization header using the Bearer scheme.',
  },
},
};

swaggerDoc(outputFile, endpointsFiles, doc);