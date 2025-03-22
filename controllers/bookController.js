/* eslint-disable no-undef */

const bookSchema = require('../models/bookModel');
// eslint-disable-next-line no-unused-vars
const express = require('express');

const utilities= require('../utilities/');
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

 const addBook = async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

 const updateBook= async (req, res) => {
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
    getBookById

};