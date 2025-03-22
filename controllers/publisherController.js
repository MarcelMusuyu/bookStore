/* eslint-disable no-undef */
const publisherSchema = require('../models/publisherModel');
const utilities= require('../utilities/');

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

        const publisher = await Publisher.findById(req.params.id).populate({
            path: 'books', // Populate the 'books' field
            model: 'Book' // Specify the model to use
        });

        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        // Find all books that have the publisher id as their publisher field.
        const books = await Book.find({publisher: publisher._id});

        // Add the books to the publisher object.
        publisher.books = books;

        res.setHeader('Content-Type', 'application/json');
        res.json(publisher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addPublisher =  async (req, res) => {
      const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
    const publisher = new Publisher(req.body);
    try {
        const newPublisher = await publisher.save();
        res.status(201).json(newPublisher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updatePublisher =  async (req, res) => {
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
    getPublisherByIdWithBooks

};

