const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const Restaurant = db.Restaurant;
const RestaurantMenu = db.RestaurantMenu;
const RestaurantPhoto = db.RestaurantPhoto;
const RestaurantComodity = db.RestaurantComodity;
const RestaurantAmbiance = db.RestaurantAmbiance;
const RestaurantCuisineType = db.RestaurantCuisineType;
const Comodity = db.Comodity;
const Ambiance = db.Ambiance;
const CuisineType = db.CuisineType;

/**
 * Crée un nouveau restaurant avec les données spécifiées.
 * @param {object} restaurantData - Les données du restaurant à créer.
 * @returns {Promise<Restaurant>} - La nouvelle instance du restaurant créée.
 */
const createRestaurant = async (restaurantData) => {
  const newRestaurant = await Restaurant.create(restaurantData);
  return newRestaurant;
};

/**
 * Modifie un restaurant existant en utilisant son ID.
 * @param {string} id - L'ID du restaurant à modifier.
 * @param {object} restaurantData - Les données du restaurant à mettre à jour.
 * @returns {Promise<boolean>} - Une valeur booléenne indiquant si le restaurant a été mis à jour avec succès.
 */
const updateRestaurantById = async (id, restaurantData) => {
  const updatedRestaurant = await Restaurant.update(restaurantData, {
    where: { id },
  });
  return updatedRestaurant[0] > 0;
};

/**
 * Récupère la liste de tous les restaurants actifs.
 * @returns {Promise<Restaurant[]>} - Un tableau contenant tous les restaurants actifs.
 */
const getAllActiveRestaurants = async () => {
  const restaurants = await Restaurant.findAll({
    where: { isActive: true },
    include: [
      { model: RestaurantMenu },
      { model: RestaurantPhoto },
      { model: RestaurantComodity, include: [Comodity] },
      { model: RestaurantAmbiance, include: [Ambiance] },
      { model: RestaurantCuisineType, include: [CuisineType] },
    ],
  });
  return restaurants;
};

/**
 * Récupère un restaurant par son ID.
 * @param {string} id - L'ID du restaurant à récupérer.
 * @returns {Promise<Restaurant>} - Le restaurant correspondant à l'ID spécifié.
 */
const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findOne({
    where: { id, isActive: true },
    include: [
      { model: RestaurantMenu },
      { model: RestaurantPhoto },
      { model: RestaurantComodity, include: [Comodity] },
      { model: RestaurantAmbiance, include: [Ambiance] },
      { model: RestaurantCuisineType, include: [CuisineType] },
    ],
  });
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found', 'Restaurant introuvable');
  }
  restaurant.visits += 1;
  await restaurant.save();
  return restaurant;
};

/**
 * Récupère le nombre total de restaurants.
 * @returns {Promise<number>} - Le nombre total de restaurants.
 */
const getTotalRestaurantCount = async () => {
  const count = await Restaurant.count();
  return count;
};

/**
 * Récupère le nombre total de restaurants enregistrés par mois sur les 6 derniers mois.
 * @returns {Promise<object>} - Un objet contenant le nombre de restaurants enregistrés par mois.
 */
const getRestaurantCountByMonth = async () => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const countByMonth = await Restaurant.findAll({
    attributes: [
      [db.sequelize.fn('date_trunc', 'month', db.sequelize.col('createdAt')), 'month'],
      [db.sequelize.fn('count', '*'), 'count'],
    ],
    where: {
      createdAt: {
        [db.Sequelize.Op.between]: [sixMonthsAgo, currentDate],
      },
    },
    group: ['month'],
    raw: true,
  });

  return countByMonth;
};

/**
 * Récupère la liste des 10 restaurants les plus visités.
 * @returns {Promise<Array<Restaurant>>} - Un tableau contenant les 10 restaurants les plus visités.
 */
const getTopVisitedRestaurants = async () => {
  const topVisitedRestaurants = await Restaurant.findAll({
    order: [['visits', 'DESC']],
    limit: 10,
  });
  return topVisitedRestaurants;
};

const filterRestaurants = async (filters) => {
  const {
    location = '',
    minBudget = 0,
    maxBudget = 10000000,
    cuisineTypes,
    ambiances,
    comodities,
  } = filters;
  const whereCondition = {};

  if (location !== '') {
    whereCondition.localisation = location;
  }
  if (cuisineTypes && cuisineTypes.length > 0) {
    whereCondition.id = {
      [Op.in]: sequelize.literal(
        `(SELECT "RestaurantId" FROM "restaurant_cuisine_types" WHERE "CuisineTypeId" IN (SELECT id FROM "cuisie_types" WHERE name IN (${cuisineTypes
          .map((type) => `'${type}'`)
          .join(',')})))`
      ),
    };
  }

  if (ambiances && ambiances.length > 0) {
    whereCondition.id = {
      [Op.in]: sequelize.literal(
        `(SELECT "RestaurantId" FROM "restaurant_ambiances" WHERE "AmbianceId" IN (SELECT id FROM "ambiances" WHERE name IN (${ambiances
          .map((ambiance) => `'${ambiance}'`)
          .join(',')})))`
      ),
    };
  }

  if (comodities && comodities.length > 0) {
    whereCondition.id = {
      [Op.in]: sequelize.literal(
        `(SELECT "RestaurantId" FROM "restaurant_comodities" WHERE "ComodityId" IN (SELECT id FROM "comodities" WHERE name IN (${comodities
          .map((comodity) => `'${comodity}'`)
          .join(',')})))`
      ),
    };
  }

  whereCondition.budget_min = { [Op.between]: [minBudget, maxBudget] };

  const filteredRestaurants = await Restaurant.findAll({
    where: whereCondition,
  });

  return filteredRestaurants;
};

module.exports = {
  createRestaurant,
  updateRestaurantById,
  getAllActiveRestaurants,
  getRestaurantById,
  getTotalRestaurantCount,
  getRestaurantCountByMonth,
  getTopVisitedRestaurants,
  filterRestaurants,
};
