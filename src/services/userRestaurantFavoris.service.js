const db = require('../models/index');
const UserRestaurantFavoris = db.UserRestaurantFavoris;
const Restaurant = db.Restaurant;
const Comodity = db.Comodity;
const Ambiance = db.Ambiance;
const CuisineType = db.CuisineType;
/**
 * Ajoute un restaurant favori à un utilisateur.
 * @param {string} UserId - L'ID de l'utilisateur.
 * @param {string} RestaurantId - L'ID du restaurant favori.
 */
const addUserRestaurantFavoris = async (UserId, RestaurantId) => {
  const newFavoris = await UserRestaurantFavoris.create({
    UserId,
    RestaurantId,
  });
  return newFavoris;
};

/**
 * Récupère la liste des restaurants favoris d'un utilisateur.
 * @param {string} UserId - L'ID de l'utilisateur.
 * @returns {Promise<UserRestaurantFavoris[]>} La liste des restaurants favoris de l'utilisateur.
 */
const getUserRestaurantFavoris = async (UserId) => {
  const favoris = await UserRestaurantFavoris.findAll({
    where: { UserId, isActive: true },
    order: [['id', 'DESC']],
    include: [
      { model: Restaurant },
      { model: Comodity },
      { model: Ambiance },
      { model: CuisineType },
    ],
  });
  return favoris;
};

/**
 * Récupère la liste des restaurants favoris d'un utilisateur.
 * @param {string} UserId - L'ID de l'utilisateur.
 * @param {string} RestaurantId - L'ID du restaurant.
 * @returns {Promise<UserRestaurantFavoris[]>} La liste des restaurants favoris de l'utilisateur.
 */
const getFavorisByUserIdAndRestaurantId = async (UserId, RestaurantId) => {
  const favoris = await UserRestaurantFavoris.count({
    where: { UserId, RestaurantId, isActive: true },
  });
  return favoris;
};

/**
 * Supprime un restaurant favori d'un utilisateur.
 * @param {string} UserId - L'ID de l'utilisateur.
 * @param {string} RestaurantId - L'ID du restaurant favori à supprimer.
 * @returns {Promise<number>} Le nombre de restaurants favoris supprimés (1 si la suppression réussit, 0 sinon).
 */
const deleteUserRestaurantFavoris = async (UserId, RestaurantId) => {
  const deletedFavoris = await UserRestaurantFavoris.destroy({
    where: { UserId, RestaurantId },
  });
  return deletedFavoris;
};

module.exports = {
  addUserRestaurantFavoris,
  getUserRestaurantFavoris,
  getFavorisByUserIdAndRestaurantId,
  deleteUserRestaurantFavoris,
};
