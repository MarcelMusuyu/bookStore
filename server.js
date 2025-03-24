/* eslint-disable no-undef */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const env = require("dotenv").config();

const bookRoutes = require('./routes/bookRoutes');
const publisherRoutes = require('./routes/publisherRoutes');

const connectDB = require('./database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json'); // Path to your generated Swagger file
// const swaggerSpec = require('./swagger'); // Import swagger.js

// For parsing application/json
app.use(express.json());

app.use(cors({ origin: '*' })); // Enable CORS for all routes
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

// connectDB.main().catch(console.error);


// Routes
app.use('/books', bookRoutes);
app.use('/publishers', publisherRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
