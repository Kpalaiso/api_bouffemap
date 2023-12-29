const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  addUserAmbiance,
  getUserAmbiances,
  deleteUserAmbiance,
  addUserCuisineType,
  getUserCuisineTypes,
  deleteUserCuisineType,
  addUserEstablishment,
  getUserEstablishments,
  deleteUserEstablishment,
} = require('../../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth(), getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', auth(), getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               localisation:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               typeAuth:
 *                 type: string
 *               device:
 *                 type: string
 *               PersonalData:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', auth(), updateUser);

/**
 * @swagger
 * /users/ambiances:
 *   post:
 *     summary: Add an ambiance to a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               ambianceId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/ambiances', auth(), addUserAmbiance);

/**
 * @swagger
 * /users/{userId}/ambiances:
 *   get:
 *     summary: Get ambiances of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:userId/ambiances', auth(), getUserAmbiances);

/**
 * @swagger
 * /users/{userId}/ambiances/{ambianceId}:
 *   delete:
 *     summary: Delete an ambiance from a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: ambianceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the ambiance
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:userId/ambiances/:ambianceId', auth(), deleteUserAmbiance);

/**
 * @swagger
 * /users/cuisine-types:
 *   post:
 *     summary: Add a cuisine type to a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               cuisineTypeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/cuisine-types', auth(), addUserCuisineType);

/**
 * @swagger
 * /users/{userId}/cuisine-types:
 *   get:
 *     summary: Get cuisine types of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:userId/cuisine-types', auth(), getUserCuisineTypes);

/**
 * @swagger
 * /users/{userId}/cuisine-types/{cuisineTypeId}:
 *   delete:
 *     summary: Delete a cuisine type from a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: cuisineTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cuisine type
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:userId/cuisine-types/:cuisineTypeId', auth(), deleteUserCuisineType);

/**
 * @swagger
 * /users/establishments:
 *   post:
 *     summary: Add an establishment to a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               establishmentId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/establishments', auth(), addUserEstablishment);

/**
 * @swagger
 * /users/{userId}/establishments:
 *   get:
 *     summary: Get establishments of a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:userId/establishments', auth(), getUserEstablishments);

/**
 * @swagger
 * /users/{userId}/establishments/{establishmentId}:
 *   delete:
 *     summary: Delete an establishment from a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: establishmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the establishment
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:userId/establishments/:establishmentId', auth(), deleteUserEstablishment);

module.exports = router;
