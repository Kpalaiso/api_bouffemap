const db = require('../models/index');
const RestaurantPhoto = db.RestaurantPhoto;

/**
 * Ajoute une nouvelle photo de restaurant.
 * @param {string} RestaurantId - L'ID du restaurant.
 * @param {string} urlImage - L'URL de l'image.
 */
const addRestaurantPhoto = async (RestaurantId, urlImage) => {
  const newPhoto = await RestaurantPhoto.create({
    RestaurantId,
    urlImage,
  });
  return newPhoto;
};

/**
 * Récupère toutes les photos de restaurant.
 * @param {string} RestaurantId - L'ID du restaurant.
 * @returns {Promise<RestaurantPhoto[]>} Les photos de restaurant.
 */
const getAllPhotosByRestaurantId = async (RestaurantId) => {
  const photos = await RestaurantPhoto.findAll({ where: { RestaurantId, isActive: true } });
  return photos;
};

/**
 * Supprime une photo de restaurant.
 * @param {string} photoId - L'ID de la photo à supprimer.
 * @returns {Promise<number>} Le nombre de photos supprimées (1 si la suppression réussit, 0 sinon).
 */
const deleteRestaurantPhoto = async (photoId) => {
  const deletedPhoto = await RestaurantPhoto.destroy({
    where: { id: photoId },
  });
  return deletedPhoto;
};

module.exports = {
  addRestaurantPhoto,
  getAllPhotosByRestaurantId,
  deleteRestaurantPhoto,
};
