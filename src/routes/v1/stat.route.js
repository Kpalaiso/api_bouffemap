const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const { getStatistics } = require('../../controllers/stat.controller');

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: API endpoints for statistics
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get statistics
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth(), getStatistics);

module.exports = router;
