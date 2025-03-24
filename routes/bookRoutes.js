/* eslint-disable no-undef */
const routers= require('express').Router();
const controller = require('../controllers/bookController');



routers.get('/', controller.getBooks);


routers.get('/:id', controller.getBookById);


routers.post('/', controller.addBookValidationRules, controller.addBook);

routers.put('/:id', controller.updateBookValidationRules, controller.updateBook);

routers.delete('/:id', controller.deleteBook);
module.exports = routers;
