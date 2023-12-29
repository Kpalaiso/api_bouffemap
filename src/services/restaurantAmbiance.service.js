const db = require('../models/index');
const RestaurantAmbiance = db.RestaurantAmbiance;

/**
 * Ajoute une ambiance à un restaurant.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} AmbianceId - L'ID de l'ambiance à ajouter.
 * @returns {Promise<RestaurantAmbiance>} - L'association d'ambiance ajoutée.
 */
const addRestaurantAmbiance = async (RestaurantId, AmbianceId) => {
  const restaurantAmbiance = await RestaurantAmbiance.create({
    RestaurantId,
    AmbianceId,
  });
  return restaurantAmbiance;
};

/**
 * Récupère les ambiances d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @returns {Promise<Array<RestaurantAmbiance>>} - Les associations d'ambiance du restaurant.
 */
const getRestaurantAmbiancesByRestaurantId = async (RestaurantId) => {
  const restaurantAmbiances = await RestaurantAmbiance.findAll({
    where: { RestaurantId, isActive: true },
  });
  return restaurantAmbiances;
};

/**
 * Supprime les ambiances d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} AmbianceId - L'ID de l'ambiance à supprimer.
 * @returns {Promise<void>}
 */
const deleteRestaurantAmbiances = async (RestaurantId, AmbianceId) => {
  await RestaurantAmbiance.destroy({
    where: { RestaurantId, AmbianceId },
  });
};

module.exports = {
  addRestaurantAmbiance,
  getRestaurantAmbiancesByRestaurantId,
  deleteRestaurantAmbiances,
};
