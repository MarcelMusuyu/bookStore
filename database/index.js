/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const env = require("dotenv").config();

// dbConnect.js
const mongoose = require('mongoose');

const dbConnections = {};

async function connectToDatabase(dbName) {
  if (dbConnections[dbName]) {
    return dbConnections[dbName]; // Return existing connection if available
  }

  try {
    const connection = await mongoose.createConnection(process.env.MONGODB_URI + '/' + dbName);
    dbConnections[dbName] = connection;
    console.log(`Connected to database: ${dbName}`);
    return connection;
  } catch (err) {
    console.error(`Error connecting to database ${dbName}:`, err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

module.exports = connectToDatabase;