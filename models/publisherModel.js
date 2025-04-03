/* eslint-disable no-undef */

const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; //
/**
 * @swagger
 * components:
 * schemas:
 * Publisher:
 * type: object
 * required:
 * - firstName
 * - email
 * - username
 * - password
 * properties:
 * firstName:
 * type: string
 * description: The first name of the publisher.
 * lastName:
 * type: string
 * description: The last name of the publisher.
 * email:
 * type: string
 * format: email
 * description: The email address of the publisher.
 * phone:
 * type: string
 * description: The phone number of the publisher.
 * username:
 * type: string
 * description: The username of the publisher.
 * password:
 * type: string
 * description: The password of the publisher.
 * books:
 * type: array
 * items:
 * type: string
 * description: Array of book IDs associated with the publisher.
 */
const publisherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  books: [{
        type: Schema.Types.ObjectId,
        
        ref: 'book' // Reference the 'book' model
    }]
});


// const publisher = mongoose.model('publisher', publisherSchema)
module.exports = publisherSchema;