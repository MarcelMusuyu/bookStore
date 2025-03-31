/* eslint-disable no-undef */
// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require("dotenv").config();
const publisherSchema = require('../models/publisherModel');
const utilities = require('../utilities');

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const Publisher = await utilities.getModel('bookStore', publisherSchema, 'publisher');
    const publisher = await Publisher.findOne({ username });

    if (!publisher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, publisher.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      publisher: {
        id: publisher.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Replace with your secret key
      { expiresIn: '1h' }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;