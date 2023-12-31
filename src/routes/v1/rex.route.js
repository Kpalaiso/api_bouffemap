const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const {
  addRexToRestaurant,
  getRestaurantRexList,
  deleteRex,
} = require('../../controllers/rex.controller');

/**
 * @swagger
 * tags:
 *   name: Rex
 *   description: API endpoints for restaurant rex
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rex:
 *       type: object
 *       properties:
 *         beauty_restaurant:
 *           type: integer
 *         healthiness_restaurant:
 *           type: integer
 *         quality_reception:
 *           type: integer
 *         quality_food:
 *           type: integer
 *         speed_service:
 *           type: integer
 *         comodity:
 *           type: integer
 *         payment_diversity:
 *           type: integer
 *         averageNote:
 *           type: integer
 *         rex:
 *           type: string
 *         UserId:
 *           type: integer
 *         RestaurantId:
 *           type: integer
 */

/**
 * @swagger
 * /rex:
 *   post:
 *     summary: Add a rex to a restaurant
 *     tags: [Rex]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rex'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', auth(), addRexToRestaurant);

/**
 * @swagger
 * /rex/{restaurantId}:
 *   get:
 *     summary: Get the list of restaurant rex
 *     tags: [Rex]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/:restaurantId', auth(), getRestaurantRexList);

/**
 * @swagger
 * /rex/{id}:
 *   delete:
 *     summary: Delete a rex
 *     tags: [Rex]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
router.delete('/:id', auth(), deleteRex);

module.exports = router;
