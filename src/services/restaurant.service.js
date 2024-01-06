const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');
const db = require('../models/index');
const { log } = require('winston');
const Restaurant = db.Restaurant;
const RestaurantMenu = db.RestaurantMenu;
const RestaurantPhoto = db.RestaurantPhoto;
// const RestaurantCuisineType = db.RestaurantCuisineType;
// const RestaurantAmbiance = db.RestaurantAmbiance;
// const RestaurantCommodity = db.RestaurantCommodity;
const Comodity = db.Comodity;
const Ambiance = db.Ambiance;
const CuisineType = db.CuisineType;
const UserRestaurantRex = db.UserRestaurantRex;

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
 * Modifie un restaurant existant en utilisant son ID.
 * @param {string} id - L'ID du restaurant à modifier.
 * @param {object} averageNote - Average Note à mettre à jour.
 * @returns {Promise<boolean>} - Une valeur booléenne indiquant si le restaurant a été mis à jour avec succès.
 */
const updateAverageNoteRestaurantById = async (id, averageNote) => {
  const restaurant = await getRestaurantById(id);

  // Met à jour les propriétés de l'ambiance
  restaurant.averageNote = averageNote;
  await restaurant.save();

  return restaurant;
};

/**
 * Récupère la liste de tous les restaurants actifs.
 * @returns {Promise<Restaurant[]>} - Un tableau contenant tous les restaurants actifs.
 */
const getAllActiveRestaurants = async () => {
  const restaurants = await Restaurant.findAll({
    where: { isActive: true },
    order: [['id', 'DESC']],
    include: [{ model: Comodity }, { model: Ambiance }, { model: CuisineType }],
  });
  // { model: RestaurantMenu },
  // { model: RestaurantPhoto },

  // { model: RestaurantComodity, include: [Comodity] },
  // { model: RestaurantAmbiance, include: [Ambiance] },
  // { model: RestaurantCuisineType, include: [CuisineType] },
  console.log(restaurants);
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
      { model: Comodity },
      { model: Ambiance },
      { model: CuisineType },
      {
        model: UserRestaurantRex,
        include: [db.User],
        limit: 3,
      },
      { model: RestaurantMenu },
      { model: RestaurantPhoto, limit: 6 },
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
    maxBudget = 10,
    cuisineTypeIds,
    ambianceIds,
    comodityIds,
    establishmentIds,
  } = filters;
  const whereCondition = {};

  if (location !== '') {
    whereCondition.commune = location;
  }

  if (cuisineTypeIds && cuisineTypeIds.length > 0) {
    whereCondition.id = {
      [Op.in]: db.Sequelize.literal(
        `(SELECT RestaurantId FROM \`restaurant_cuisine_types\` WHERE CuisineTypeId IN (${cuisineTypeIds
          .map((type) => `${type}`)
          .join(',')}))`
      ),
    };
  }

  if (ambianceIds && ambianceIds.length > 0) {
    whereCondition.id = {
      [Op.in]: db.Sequelize.literal(
        `(SELECT RestaurantId FROM \`restaurant_ambiances\` WHERE AmbianceId IN (${ambianceIds
          .map((ambiance) => `'${ambiance}'`)
          .join(',')}))`
      ),
    };
  }

  if (comodityIds && comodityIds.length > 0) {
    whereCondition.id = {
      [Op.in]: db.Sequelize.literal(
        `(SELECT RestaurantId FROM \`restaurant_comodities\` WHERE ComodityId IN (${comodityIds
          .map((comodity) => `'${comodity}'`)
          .join(',')}))`
      ),
    };
  }

  if (establishmentIds && establishmentIds.length > 0) {
    whereCondition.id = {
      [Op.in]: db.Sequelize.literal(
        `(SELECT id FROM \`restaurants\` WHERE etablissementType IN  (${establishmentIds
          .map((establishment) => `'${establishment}'`)
          .join(',')}))`
      ),
    };
  }

  whereCondition.budget = { [Op.between]: [minBudget, maxBudget] };

  const filteredRestaurants = await Restaurant.findAll({
    where: whereCondition,
  });

  return filteredRestaurants;
};

const filterRestaurantss = async (filters) => {
  const {
    location = '',
    minBudget = 0,
    maxBudget = 10000000,
    cuisineTypeIds = [],
    ambianceIds = [],
    comodityIds = [],
    establishmentIds = [],
  } = filters;

  const whereCondition = {};

  if (location !== '') {
    whereCondition.commune = location;
  }

  whereCondition.budget_min = { [Op.between]: [minBudget, maxBudget] };

  const filteredRestaurants = await Restaurant.findAll({
    where: whereCondition,
    include: [
      {
        model: CuisineType,
        where: {
          id: {
            [Op.in]: cuisineTypeIds,
          },
        },
      },
      {
        model: Ambiance,
        where: {
          id: {
            [Op.in]: ambianceIds,
          },
        },
      },

      {
        model: Comodity,
        where: {
          id: {
            [Op.in]: comodityIds,
          },
        },
      },
      // {
      //   model: Establishment,
      //   where: {
      //     id: {
      //       [Op.in]: establishmentIds,
      //     },
      //   },
      // },
    ],
  });

  return filteredRestaurants;
};

module.exports = {
  createRestaurant,
  updateRestaurantById,
  updateAverageNoteRestaurantById,
  getAllActiveRestaurants,
  getRestaurantById,
  getTotalRestaurantCount,
  getRestaurantCountByMonth,
  getTopVisitedRestaurants,
  filterRestaurants,
};
