/* eslint-disable no-undef */
const routers= require('express').Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/publisherController');



routers.get('/', controller.getPublishers);

// Route to get a publisher with its books by ID
routers.get('/:id/books', controller.getPublisherByIdWithBooks);

routers.get('/:id', controller.getPublisherById);



routers.post('/', controller.addPublisherValidationRules, controller.addPublisher);

routers.put('/:id', controller.updatePublisherValidationRules, controller.updatePublisher);

routers.delete('/:id', controller.deletePublisher);
module.exports = routers;
