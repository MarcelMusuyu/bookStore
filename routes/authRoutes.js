/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require("dotenv").config();
const publisherSchema = require('../models/publisherModel');
const utilities = require('../utilities');

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: User login
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/definitions/Login'
 * responses:
 * 200:
 * description: Login successful, JWT token in Authorization header.
 * headers:
 * Authorization:
 * schema:
 * type: string
 * description: JWT token for authorization.
 * 400:
 * description: Invalid credentials.
 * 500:
 * description: Server error.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const Publisher = await utilities.getModel('bookStore', publisherSchema, 'publisher');
    const publisher = await Publisher.findOne({ username });

    if (!publisher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // const isMatch = await bcrypt.compare(password, publisher.password);

    // if (!isMatch) {
    //  return res.status(400).json({ message: 'Invalid credentials' });
    // }

    const payload = {
      publisher: {
        id: publisher.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // Sending token in response header
        res.header('Authorization', `Bearer ${token}`).json({ message: 'Login successful' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;