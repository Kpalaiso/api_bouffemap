const db = require('../models/index');
const RestaurantCommodity = db.RestaurantCommodity;

/**
 * Ajoute une commodité à un restaurant.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} ComodityId - L'ID de la commodité à ajouter.
 * @returns {Promise<RestaurantCommodity>} - L'association de commodité ajoutée.
 */
const addRestaurantCommodity = async (RestaurantId, ComodityId) => {
  const restaurantCommodity = await RestaurantCommodity.create({
    RestaurantId,
    ComodityId,
  });
  return restaurantCommodity;
};

/**
 * Récupère les commodités d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @returns {Promise<Array<RestaurantCommodity>>} - Les associations de commodité du restaurant.
 */
const getRestaurantCommoditiesByRestaurantId = async (RestaurantId) => {
  const restaurantCommodities = await RestaurantCommodity.findAll({
    where: { RestaurantId, isActive: true },
  });
  return restaurantCommodities;
};

/**
 * Supprime les commodités d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} ComodityId - L'ID de la commodité à supprimer.
 * @returns {Promise<void>}
 */
const deleteRestaurantCommodities = async (RestaurantId, ComodityId) => {
  await RestaurantCommodity.destroy({
    where: { RestaurantId, ComodityId },
  });
};

module.exports = {
  addRestaurantCommodity,
  getRestaurantCommoditiesByRestaurantId,
  deleteRestaurantCommodities,
};
