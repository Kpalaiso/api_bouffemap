const express = require('express');
const auth = require('../../middlewares/auth');

const {
  createComodity,
  updateComodity,
  getAllComodities,
  createCuisineType,
  updateCuisineType,
  getAllCuisineTypes,
  createAmbiance,
  updateAmbiance,
  getAllAmbiances,
  createEstablishment,
  updateEstablishment,
  getAllEstablishments,
} = require('../../controllers/settings.controller');

const router = express.Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: API endpoints for settings
 */

/**
 * @swagger
 * /settings/comodities:
 *   post:
 *     summary: Create a new comodity
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/comodities', auth(), createComodity);

/**
 * @swagger
 * /settings/comodities/{id}:
 *   put:
 *     summary: Update a comodity by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comodity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
router.put('/comodities/:id', auth(), updateComodity);

/**
 * @swagger
 * /settings/comodities:
 *   get:
 *     summary: Get all comodities
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/comodities', auth(), getAllComodities);

/**
 * @swagger
 * /settings/cuisine-types:
 *   post:
 *     summary: Create a new cuisine type
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/cuisine-types', auth(), createCuisineType);

/**
 * @swagger
 * /settings/cuisine-types/{id}:
 *   put:
 *     summary: Update a cuisine type by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cuisine type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
router.put('/cuisine-types/:id', auth(), updateCuisineType);

/**
 * @swagger
 * /settings/cuisine-types:
 *   get:
 *     summary: Get all cuisine types
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/cuisine-types', auth(), getAllCuisineTypes);

/**
 * @swagger
 * /settings/ambiances:
 *   post:
 *     summary: Create a new ambiance
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/ambiances', auth(), createAmbiance);

/**
 * @swagger
 * /settings/ambiances/{id}:
 *   put:
 *     summary: Update an ambiance by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ambiance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
router.put('/ambiances/:id', auth(), updateAmbiance);

/**
 * @swagger
 * /settings/ambiances:
 *   get:
 *     summary: Get all ambiances
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/ambiances', auth(), getAllAmbiances);

/**
 * @swagger
 * /settings/establishments:
 *   post:
 *     summary: Create a new establishment
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/establishments', auth(), createEstablishment);

/**
 * @swagger
 * /settings/establishments/{id}:
 *   put:
 *     summary: Update an establishment by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the establishment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
router.put('/establishments/:id', auth(), updateEstablishment);

/**
 * @swagger
 * /settings/establishments:
 *   get:
 *     summary: Get all establishments
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/establishments', auth(), getAllEstablishments);

module.exports = router;
