/* eslint-disable no-undef */

const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; //

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