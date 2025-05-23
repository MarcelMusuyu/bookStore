// middleware/auth.js

const jwt = require('jsonwebtoken');
const env = require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1],  process.env.JWT_SECRET); // Verify the token

    req.publisher = decoded.publisher;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};