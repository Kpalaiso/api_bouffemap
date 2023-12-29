const db = require('../models/index');
const RestaurantCuisineType = db.RestaurantCuisineType;
const CuisineType = db.CuisineType;

/**
 * Ajoute un type de cuisine à un restaurant.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} CuisineTypeId - L'ID du type de cuisine à ajouter.
 * @returns {Promise<RestaurantCuisineType>} - L'association de type de cuisine ajoutée.
 */
const addRestaurantCuisineType = async (RestaurantId, CuisineTypeId) => {
  const restaurantCuisineType = await RestaurantCuisineType.create({
    RestaurantId,
    CuisineTypeId,
  });
  return restaurantCuisineType;
};

/**
 * Récupère les types de cuisine d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @returns {Promise<Array<RestaurantCuisineType>>} - Les associations de types de cuisine du restaurant.
 */
const getRestaurantCuisineTypesByRestaurantId = async (RestaurantId) => {
  const restaurantCuisineTypes = await RestaurantCuisineType.findAll({
    where: { RestaurantId, isActive: true },
    include: [CuisineType],
  });
  return restaurantCuisineTypes;
};

/**
 * Supprime les types de cuisine d'un restaurant en fonction de son ID.
 * @param {number} RestaurantId - L'ID du restaurant.
 * @param {number} CuisineTypeId - L'ID du type de cuisine à supprimer.
 * @returns {Promise<void>}
 */
const deleteRestaurantCuisineTypes = async (RestaurantId, CuisineTypeId) => {
  await RestaurantCuisineType.destroy({
    where: { RestaurantId, CuisineTypeId },
  });
};

/**
 * Récupère le nombre total de restaurants par type de cuisine.
 * @returns {Promise<Array<{ cuisineName: string, count: number }>>} - Un tableau contenant le nom de la cuisine et le nombre total de restaurants associés à ce type de cuisine.
 */
const getRestaurantCountByCuisineType = async () => {
  const restaurantCountByCuisineType = await RestaurantCuisineType.findAll({
    attributes: [
      [db.sequelize.literal('CuisineType.name'), 'cuisineName'],
      [db.sequelize.fn('count', '*'), 'count'],
    ],
    include: [CuisineType],
    group: ['CuisineType.name'],
    raw: true,
  });
  return restaurantCountByCuisineType;
};

module.exports = {
  addRestaurantCuisineType,
  getRestaurantCuisineTypesByRestaurantId,
  deleteRestaurantCuisineTypes,
  getRestaurantCountByCuisineType,
};
