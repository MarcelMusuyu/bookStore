/* eslint-disable no-undef */
const routers= require('express').Router();
const controller = require('../controllers/bookController');



routers.get('/', controller.getBooks);


routers.get('/:id', controller.getBookById);

routers.post('/', controller.addBook);

routers.put('/:id', controller.updateBook);

routers.delete('/:id', controller.deleteBook);
module.exports = routers;
