const express = require('express');
const auth = require('../../middlewares/auth');

const {
  addGuide,
  modifyGuide,
  getAllActiveGuides,
  getGuideById,
  deleteGuide,
} = require('../../controllers/guide.controller');

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Guides
 *   description: API endpoints for guides
 */

/**
 * @swagger
 * /guides:
 *   post:
 *     summary: Add a new guide
 *     tags: [Guides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               url_guide:
 *                 type: string
 *               url_img:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', auth(), addGuide);

/**
 * @swagger
 * /guides/{id}:
 *   put:
 *     summary: Modify a guide by ID
 *     tags: [Guides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the guide
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               url_guide:
 *                 type: string
 *               url_img:
 *                 type: string
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
router.put('/:id', auth(), modifyGuide);

/**
 * @swagger
 * /guides:
 *   get:
 *     summary: Get all active guides
 *     tags: [Guides]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', auth(), getAllActiveGuides);

/**
 * @swagger
 * /guides/{id}:
 *   get:
 *     summary: get a guide by ID
 *     tags: [Guides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the guide
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', auth(), getGuideById);

/**
 * @swagger
 * /guides/{id}:
 *   delete:
 *     summary: Delete a guide by ID
 *     tags: [Guides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the guide
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', auth(), deleteGuide);

module.exports = router;
