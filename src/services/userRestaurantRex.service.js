const db = require('../models/index');
const UserRestaurantRex = db.UserRestaurantRex;

/**
 * Ajoute un userRestaurantRex.
 * @param {number} beauty_restaurant - La beauté du restaurant.
 * @param {number} healthiness_restaurant - La santé du restaurant.
 * @param {number} quality_reception - La qualité de l'accueil.
 * @param {number} quality_food - La qualité de la nourriture.
 * @param {number} speed_service - La rapidité du service.
 * @param {number} comodity - La commodité.
 * @param {number} payment_diversity - La diversité des modes de paiement.
 * @param {string} rex - Le commentaire/rex sur le restaurant.
 * @returns {Promise<UserRestaurantRex>} Le userRestaurantRex ajouté.
 */
const addUserRestaurantRex = async (
  UserId,
  beauty_restaurant,
  healthiness_restaurant,
  quality_reception,
  quality_food,
  speed_service,
  comodity,
  payment_diversity,
  rex
) => {
  let averageNote = 0;
  averageNote =
    (beauty_restaurant +
      healthiness_restaurant +
      quality_reception +
      quality_food +
      speed_service +
      comodity +
      payment_diversity) /
    7;
  const newUserRestaurantRex = await UserRestaurantRex.create({
    UserId,
    beauty_restaurant,
    healthiness_restaurant,
    quality_reception,
    quality_food,
    speed_service,
    comodity,
    payment_diversity,
    rex,
    averageNote,
  });
  return newUserRestaurantRex;
};

/**
 * Récupère les rex d'un restaurant.
 * @param {string} restaurantId - L'ID du restaurant.
 * @returns {Promise<UserRestaurantRex[]>} Les rex du restaurant.

 */
const getRestaurantRex = async (restaurantId) => {
  const rex = await UserRestaurantRex.findAll({
    where: { restaurantId, isActive: true },
  });
  return rex;
};

/**
 * Supprime les rex d'un restaurant.
 * @param {string} id - L'ID du User rex restaurant.
 * @returns {Promise<number>} Le nombre de rex supprimés.
 */
const deleteRestaurantRexbyId = async (id) => {
  const deletedRex = await UserRestaurantRex.destroy({
    where: { id },
  });
  return deletedRex;
};
/**
 * Récupère le nombre total de notation.
 * @returns {Promise<number>} - Le nombre total de restaurants.
 */
const getTotalRexCountByRestauranId = async (RestaurantId) => {
  const count = await UserRestaurantRex.count({
    where: { RestaurantId },
  });
  return count;
};

module.exports = {
  addUserRestaurantRex,
  getRestaurantRex,
  deleteRestaurantRexbyId,
  getTotalRexCountByRestauranId,
};