
const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; //

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  establishedYear: {type: Number}
});


const publisher = mongoose.model('publisher', publisherSchema)
module.exports = publisher;