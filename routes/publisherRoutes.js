/* eslint-disable no-undef */
const routers= require('express').Router();
const controller = require('../controllers/publisherController');



routers.get('/', controller.getPublishers);

// Route to get a publisher with its books by ID
router.get('/:id/books', controller.getPublisherByIdWithBooks);

routers.get('/:id', controller.getPublisherById);

routers.post('/', controller.addPublisher);

routers.put('/:id', controller.updatePublisher);

routers.delete('/:id', controller.deletePublisher);
module.exports = routers;
