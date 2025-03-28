/* eslint-disable no-undef */
const bookRouter = require('express').Router();
const controller = require('../controllers/bookController');

/**
 * @swagger
 * /books/:
 * get:
 * summary: Get all books
 * responses:
 * 200:
 * description: A list of books
 */
bookRouter.get('/', controller.getBooks);

/**
 * @swagger
 * /books/{id}:
 * get:
 * summary: Get a book by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * responses:
 * 200:
 * description: The book object
 * 404:
 * description: Book not found
 */
bookRouter.get('/:id', controller.getBookById);

/**
 * @swagger
 * /books/:
 * post:
 * summary: Create a new book
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * 201:
 * description: The created book
 * 400:
 * description: Validation error
 */
bookRouter.post('/', controller.addBookValidationRules, controller.addBook);

/**
 * @swagger
 * /books/{id}:
 * put:
 * summary: Update a book by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * 200:
 * description: The updated book
 * 400:
 * description: Validation error
 * 404:
 * description: Book not found
 */
bookRouter.put('/:id', controller.updateBookValidationRules, controller.updateBook);

/**
 * @swagger
 * /books/{id}:
 * delete:
 * summary: Delete a book by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The book ID
 * responses:
 * 200:
 * description: Book deleted
 * 404:
 * description: Book not found
 */
bookRouter.delete('/:id', controller.deleteBook);

module.exports = bookRouter;