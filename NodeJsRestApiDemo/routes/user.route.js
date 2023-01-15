const express = require('express');
const route = express.Router();
const { createUser, getAllUsers, getUserById, deleteUser, updateUser } = require("../controllers/user.controller.js");


/**
 * @swagger
 *  components:
 *      schema:
 *          User: 
 *              type: object
 *              properties:
 *                  name: 
 *                       type: string               
 *                  city:
 *                       type: string
 *                  salary:
 *                       type: string
 *    
 */

/**
 * @swagger
 * /rest/api/users:
 *  get:
 *      summary: This Api are use to get all users
 *      description: This Api are use to get all users
 *      responses:
 *          200:
 *              description: This Api are use to get all users
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                             $ref: '#components/schema/User'
 */
route.get('/users', getAllUsers);

/**
 * @swagger
 * /rest/api/users/{id}:
 *  get:
 *      summary: This Api are use to get user by id
 *      description: This Api are use to get user by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID Required
 *            schema:
 *             type: string 
 *      responses:
 *          200:
 *              description: This Api are use to get user by id
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                             $ref: '#components/schema/User'
 */
route.get('/users/:id', getUserById);

/**
 * @swagger
 * /rest/api/users:
 *  post:
 *      summary: This Api are use to save user
 *      description: This Api are use to save user
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/User'
 *      responses:
 *          200:
 *              description: User Created
 */
route.post('/users', createUser);

/**
 * @swagger
 * /rest/api/users/{id}:
 *  delete:
 *      summary: This Api are use to delete user by id
 *      description: This Api are use to delete user by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID Required
 *            schema:
 *             type: string 
 *      responses:
 *          200:
 *              description: User Deleted
 */
route.delete('/users/:id', deleteUser);

/**
 * @swagger
 * /rest/api/users/{id}:
 *  put:
 *      summary: This Api are use to update user by id
 *      description: This Api are use to update user by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: String ID Required
 *            schema:
 *             type: string 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/User'
 *      responses:
 *          200:
 *              description: User Updated
 */
route.put('/users/:id', updateUser)

module.exports = route;