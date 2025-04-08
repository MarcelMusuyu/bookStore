/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  pdfFile: { type: String, required: true }, // Store PDF file path or URL
  publisher: {
    type: Schema.Types.ObjectId, // Reference to Publisher model
    ref: 'publisher', // Model to use
    required: true
  },
  pageCount: { type: Number, required: true }
});

const Book = mongoose.model('books', bookSchema); // Model name and collection name

module.exports = Book;