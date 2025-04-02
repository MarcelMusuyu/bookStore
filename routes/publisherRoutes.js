/* eslint-disable no-undef */
const publisherRouter = require('express').Router();
const controller = require('../controllers/publisherController');
const auth = require('../middleware/auth'); // Import the auth middleware

/**
 * @swagger
 * /publishers/:
 * get:
 * summary: Get all publishers
 * responses:
 * 200:
 * description: A list of publishers
 */
publisherRouter.get('/',auth ,controller.getPublishers);

/**
 * @swagger
 * /publishers/{id}/books:
 * get:
 * summary: Get a publisher with its books by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The publisher ID
 * responses:
 * 200:
 * description: The publisher with its books
 * 404:
 * description: Publisher not found
 */
publisherRouter.get('/:id/books',auth, controller.getPublisherByIdWithBooks);

/**
 * @swagger
 * /publishers/{id}:
 * get:
 * summary: Get a publisher by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The publisher ID
 * responses:
 * 200:
 * description: The publisher object
 * 404:
 * description: Publisher not found
 */
publisherRouter.get('/:id',auth, controller.getPublisherById);

/**
 * @swagger
 * /publishers/:
 * post:
 * summary: Create a new publisher
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Publisher'
 * responses:
 * 201:
 * description: The created publisher
 * 400:
 * description: Validation error
 */
publisherRouter.post('/', auth, controller.addPublisherValidationRules, controller.addPublisher);

/**
 * @swagger
 * /publishers/{id}:
 * put:
 * summary: Update a publisher by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The publisher ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Publisher'
 * responses:
 * 200:
 * description: The updated publisher
 * 400:
 * description: Validation error
 * 404:
 * description: Publisher not found
 */
publisherRouter.put('/:id',auth,  controller.updatePublisherValidationRules, controller.updatePublisher);

/**
 * @swagger
 * /publishers/{id}:
 * delete:
 * summary: Delete a publisher by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The publisher ID
 * responses:
 * 200:
 * description: Publisher deleted
 * 404:
 * description: Publisher not found
 */
publisherRouter.delete('/:id', auth, controller.deletePublisher);

module.exports = publisherRouter;