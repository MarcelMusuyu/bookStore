/* eslint-disable no-undef */

const bookSchema = require('../models/bookModel');
// eslint-disable-next-line no-unused-vars
const express = require('express');

const utilities= require('../utilities/');
const { body, validationResult } = require('express-validator');
// Books

/** @Swagger
 * 
 */
const getBooks = async (req, res) => {
  try {

     const Book = await utilities.getModel('bookStore', bookSchema, 'book');
    
    const books = await Book.find();
    res.setHeader('Content-Type', 'application/json');
    
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookById = async (req, res) => {
    try {


        const Book = await utilities.getModel('bookStore', bookSchema, 'book');
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.setHeader('Content-Type', 'application/json');
         res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addBookValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    body('publicationDate').notEmpty().isISO8601().withMessage('Publication date is required and must be a valid date'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('pdfFile').notEmpty().withMessage('PDF file is required'),
    body('publisher').notEmpty().withMessage('Publisher is required'),
    body('pageCount').isInt({ min: 1 }).withMessage('Page count must be a positive integer'),
];

 const addBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 const Book = await utilities.getModel('bookStore', bookSchema, 'book');
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const updateBookValidationRules = [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('author').optional().notEmpty().withMessage('Author is required'),
    body('isbn').optional().notEmpty().withMessage('ISBN is required'),
    body('publicationDate').optional().isISO8601().withMessage('Publication date is required and must be a valid date'),
    body('genre').optional().notEmpty().withMessage('Genre is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('pdfFile').optional().notEmpty().withMessage('PDF file is required'),
    body('publisher').optional().notEmpty().withMessage('Publisher is required'),
    body('pageCount').optional().isInt({ min: 1 }).withMessage('Page count must be a positive integer'),
];
 const updateBook= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const Book = await utilities.getModel('bookStore', bookSchema, 'book');
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBook= async (req, res) => {
    try {
        const Book = await utilities.getModel('bookStore', bookSchema, 'book');
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    addBookValidationRules,
    updateBookValidationRules,

};