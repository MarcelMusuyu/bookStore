const routers= require('express').Router();
const controller = require('../controllers/publisherController');



routers.get('/', controller.getPublishers);


routers.get('/:id', controller.getPublisherById);

routers.post('/', controller.addPublisher);

routers.put('/:id', controller.updatePublisher);

routers.delete('/:id', controller.deletePublisher);
module.exports = routers;
