const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();
const restaurantController = require('../../controllers/restaurant.controller');

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API pour gérer les restaurants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         img_cover:
 *           type: string
 *         img_profil:
 *           type: string
 *         localisation:
 *           type: string
 *         contact:
 *           type: string
 *         budget_min:
 *           type: number
 *         budget_max:
 *           type: number
 *         horaire:
 *           type: string
 *         description:
 *           type: string
 *         etablissementType:
 *           type: string
 *         photos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RestaurantPhoto'
 *         menus:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RestaurantMenu'
 *         ambiances:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RestaurantAmbiance'
 *         cuisineTypes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RestaurantCuisineType'
 *         commodities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RestaurantCommodity'
 *     RestaurantPhoto:
 *       type: object
 *       properties:
 *         urlImage:
 *           type: string
 *     RestaurantMenu:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         urlMenu:
 *           type: string
 *     RestaurantAmbiance:
 *       type: object
 *       properties:
 *         AmbianceId:
 *           type: integer
 *     RestaurantCuisineType:
 *       type: object
 *       properties:
 *         CuisineTypeId:
 *           type: integer
 *     RestaurantCommodity:
 *       type: object
 *       properties:
 *         CommodityId:
 *           type: integer
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Crée un nouveau restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/', auth(), restaurantController.createRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Met à jour un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant mis à jour avec succès
 *       404:
 *         description: Restaurant non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', auth(), restaurantController.updateRestaurantbyId);

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Récupère tous les restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Liste des restaurants récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', auth(), restaurantController.getRestaurants);

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Récupère un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant à récupérer
 *     responses:
 *       200:
 *         description: Restaurant récupéré avec succès
 *       404:
 *         description: Restaurant non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', auth(), restaurantController.getRestaurantById);

/**
 * @swagger
 * /restaurants/{restaurantId}/ambiances:
 *   post:
 *     summary: Ajoute une ambiance à un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantAmbiance'
 *     responses:
 *       201:
 *         description: Ambiance ajoutée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post(
  '/restaurants/:restaurantId/ambiances',
  auth(),
  restaurantController.addRestaurantAmbiance
);

/**
 * @swagger
 * /restaurants/{restaurantId}/ambiances:
 *   get:
 *     summary: Récupère les ambiances d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Ambiances récupérées avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/:restaurantId/ambiances',
  auth(),
  restaurantController.getRestaurantAmbiancesByRestaurantId
);

/**
 * @swagger
 * /restaurants/{restaurantId}/ambiances/{ambianceId}:
 *   delete:
 *     summary: Supprime une ambiance d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *       - in: path
 *         name: ambianceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'ambiance à supprimer
 *     responses:
 *       200:
 *         description: Ambiance supprimée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  '/:restaurantId/ambiances/:ambianceId',
  auth(),
  restaurantController.deleteRestaurantAmbiances
);

/**
 * @swagger
 * /restaurants/{restaurantId}/commodities:
 *   post:
 *     summary: Ajoute un commodity à un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantCommodity'
 *     responses:
 *       201:
 *         description: Commodity ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/:restaurantId/commodities', auth(), restaurantController.addRestaurantCommodity);

/**
 * @swagger
 * /restaurants/{restaurantId}/commodities:
 *   get:
 *     summary: Récupère les commodities d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Commodities récupérés avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/:restaurantId/commodities',
  auth(),
  restaurantController.getRestaurantCommoditiesByRestaurantId
);

/**
 * @swagger
 * /restaurants/{restaurantId}/commodities/{commodityId}:
 *   delete:
 *     summary: Supprime un commodity d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *       - in: path
 *         name: commodityId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commodity à supprimer
 *     responses:
 *       200:
 *         description: Commodity supprimé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  '/:restaurantId/commodities/:commodityId',
  auth(),
  restaurantController.deleteRestaurantCommodities
);

/**
 * @swagger
 * /restaurants/{restaurantId}/cuisineTypes:
 *   post:
 *     summary: Ajoute un type de cuisine à un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantCuisineType'
 *     responses:
 *       201:
 *         description: Type de cuisine ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/:restaurantId/cuisineTypes', auth(), restaurantController.addRestaurantCuisineType);

/**
 * @swagger
 * /restaurants/{restaurantId}/cuisineTypes:
 *   get:
 *     summary: Récupère les types de cuisine d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Types de cuisine récupérés avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/:restaurantId/cuisineTypes',
  auth(),
  restaurantController.getRestaurantCuisineTypesByRestaurantId
);

/**
 * @swagger
 * /restaurants/{restaurantId}/cuisineTypes/{cuisineTypeId}:
 *   delete:
 *     summary: Supprime un type de cuisine d'un restaurant par ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du restaurant
 *       - in: path
 *         name: cuisineTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du type de cuisine à supprimer
 *     responses:
 *       200:
 *         description: Type de cuisine supprimé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete(
  '/:restaurantId/cuisineTypes/:cuisineTypeId',
  auth(),
  restaurantController.deleteRestaurantCuisineTypes
);

/**
 * @swagger
 * /restaurants/{restaurantId}/menus:
 *   post:
 *     summary: Ajoute un menu à un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/restaurantMenu'
 *     responses:
 *       201:
 *         description: Menu ajouté avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/:restaurantId/menus', auth(), restaurantController.addRestaurantMenu);

/**
 * @swagger
 * /restaurants/{restaurantId}/menus:
 *   get:
 *     summary: Récupère tous les menus d'un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Liste des menus récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/:restaurantId/menus', auth(), restaurantController.getAllMenusByRestaurantId);

/**
 * @swagger
 * /restaurants/{restaurantId}/menus/{menuId}:
 *   delete:
 *     summary: Supprime un menu d'un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du menu à supprimer
 *     responses:
 *       200:
 *         description: Menu supprimé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:restaurantId/menus/:menuId', auth(), restaurantController.deleteRestaurantMenu);

/**
 * @swagger
 * /restaurants/{restaurantId}/photos:
 *   post:
 *     summary: Ajoute une photo à un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/restaurantPhoto'
 *     responses:
 *       201:
 *         description: Photo ajoutée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/:restaurantId/photos', auth(), restaurantController.addRestaurantPhoto);

/**
 * @swagger
 * /restaurants/{restaurantId}/photos:
 *   get:
 *     summary: Récupère toutes les photos d'un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Liste des photos récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/:restaurantId/photos', auth(), restaurantController.getAllPhotosByRestaurantId);

/**
 * @swagger
 * /restaurants/{restaurantId}/photos/{photoId}:
 *   delete:
 *     summary: Supprime une photo d'un restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la photo à supprimer
 *     responses:
 *       200:
 *         description: Photo supprimée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:restaurantId/photos/:photoId', auth(), restaurantController.deleteRestaurantPhoto);

/**
 * @swagger
 * components:
 *   schemas:
 *     FilterParams:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *           description: Localisation des restaurants
 *         minBudget:
 *           type: number
 *           description: Budget minimum
 *         maxBudget:
 *           type: number
 *           description: Budget maximum
 *         cuisineTypes:
 *           type: array
 *           items:
 *             type: string
 *           description: Types de cuisine
 *         ambiances:
 *           type: array
 *           items:
 *             type: string
 *           description: Ambiances
 *         comodities:
 *           type: array
 *           items:
 *             type: string
 *           description: Commodités
 */

/**
 * @swagger
 * /restaurants/filter:
 *   post:
 *     summary: Filtre les restaurants en fonction des paramètres
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilterParams'
 *     responses:
 *       200:
 *         description: Restaurants filtrés récupérés avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post('/filter', restaurantController.filterRestaurants);

module.exports = router;
