const express = require('express');
const auth = require('../../middlewares/auth');

const {
  addUserRestaurantFavoris,
  getUserRestaurantFavoris,
  removeUserRestaurantFavoris,
} = require('../../controllers/favoris.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favoris
 *   description: API endpoints for user-restaurant favoris
 */

/**
 * @swagger
 * /favoris:
 *    post:
 *     summary: Add user-restaurant favoris
 *     tags: [Favoris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: integer
 *               RestaurantId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', auth(), addUserRestaurantFavoris);

/**
 * @swagger
 * /favoris/user/{userId}:
 *   get:
 *     summary: Get user-restaurant favoris
 *     tags: [Favoris]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: id of the users
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', auth(), getUserRestaurantFavoris);

/**
 * @swagger
 * /favoris:
 *   delete:
 *     summary: Remove a user-restaurant favori
 *     tags: [Favoris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: integer
 *               RestaurantId:
 *                 type: integer
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
router.delete('/', auth(), removeUserRestaurantFavoris);

module.exports = router;
