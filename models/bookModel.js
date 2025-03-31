/* eslint-disable no-undef */
const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; //


// Schemas
/**
 * @swagger
 * components:
 * schemas:
 * Book:
 * type: object
 * required:
 * - title
 * - author
 * - isbn
 * - publicationDate
 * - genre
 * - description
 * - pdfFile
 * - publisher
 * - pageCount
 * properties:
 * title:
 * type: string
 * description: The title of the book.
 * author:
 * type: string
 * description: The author of the book.
 * isbn:
 * type: string
 * description: The ISBN of the book.
 * publicationDate:
 * type: string
 * format: date
 * description: The publication date of the book.
 * genre:
 * type: string
 * description: The genre of the book.
 * description:
 * type: string
 * description: The description of the book.
 * pdfFile:
 * type: string
 * description: The PDF file path or URL.
 * publisher:
 * type: string
 * description: The ID of the publisher.
 * pageCount:
 * type: integer
 * description: The number of pages in the book.
 * minimum: 1
 */
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
    required: true },
  pageCount: { type: Number, required: true}
});

// const Book = mongoose.model('book', bookSchema);
module.exports = bookSchema;