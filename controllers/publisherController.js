/* eslint-disable no-undef */
const publisherSchema = require('../models/publisherModel');
const utilities= require('../utilities/');

// Publishers
const getPublishers =  async (req, res) => {
    try {
        const Publisher = await  utilities.getModel('bookStore', publisherSchema, 'publisher');
        const publishers = await Publisher.find();
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
    deletePublisher


};

