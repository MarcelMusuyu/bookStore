/* eslint-disable no-undef */
const { body, validationResult } = require('express-validator');
const publisherSchema = require('../models/publisherModel');
const utilities= require('../utilities/');
const bookSchema = require('../models/bookModel');

// Publishers
const getPublishers =  async (req, res) => {
    try {
        const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
        const publishers = await Publisher.find();
        res.setHeader('Content-Type', 'application/json');
        res.json(publishers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPublisherById =  async (req, res) => {
    try {
          const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
        res.setHeader('Content-Type', 'application/json');
        res.json(publisher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Assuming you have your bookSchema and publisherSchema defined elsewhere

const getPublisherByIdWithBooks = async (req, res) => {
    try {
        const Publisher = await utilities.getModel('bookStore', publisherSchema, 'Publisher');
        const Book = await utilities.getModel('bookStore', bookSchema, 'Book'); // Get the Book model

       const publisher = await Publisher.findById(req.params.id);

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        const books = await Book.find({ publisher: publisher._id }).select('title author isbn publicationDate'); // Select specific fields

        publisher.books = books;

        res.setHeader('Content-Type', 'application/json');
        res.json(publisher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addPublisherValidationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('email').notEmpty().withMessage('Email is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('password').notEmpty().withMessage('Password is required'),
];


const addPublisher =  async (req, res) => {

     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
      const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
    const publisher = new Publisher(req.body);
    try {
        const newPublisher = await publisher.save();
        res.status(201).json(newPublisher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updatePublisherValidationRules = [
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('email').optional().isEmail().withMessage('Email must be a valid email address'),
    body('email').optional().notEmpty().withMessage('Email is required'),
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('password').optional().notEmpty().withMessage('Password is required'),
];

const updatePublisher =  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
          const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
        const updatedPublisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPublisher) return res.status(404).json({ message: 'Publisher not found' });
        res.json(updatedPublisher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePublisher = async (req, res) => {
    try {
          const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
        const deletedPublisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!deletedPublisher) return res.status(404).json({ message: 'Publisher not found' });
        res.json({ message: 'Publisher deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getPublishers,
    getPublisherById,
    addPublisher,
    updatePublisher,
    deletePublisher,
    getPublisherByIdWithBooks,
    updatePublisherValidationRules,
    addPublisherValidationRules
};

