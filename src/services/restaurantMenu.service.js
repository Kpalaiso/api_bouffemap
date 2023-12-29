const db = require('../models/index');
const RestaurantMenu = db.RestaurantMenu;

/**
 * Ajoute un nouveau menu de restaurant.
 * @param {string} title - Le titre du menu.
 * @param {string} urlMenu - L'URL du menu.
 * @param {string} RestaurantId - L'ID du restaurant.
 * @returns {Promise<RestaurantMenu>} Le nouveau menu de restaurant créé.
 */
const addRestaurantMenu = async (RestaurantId, title, urlMenu) => {
  const newMenu = await RestaurantMenu.create({
    title,
    urlMenu,
    RestaurantId,
  });
  return newMenu;
};

/**
 * Récupère tous les menus de restaurant.
 * @param {string} RestaurantId - L'ID du restaurant.
 * @returns {Promise<RestaurantMenu[]>} Les menus de restaurant.
 */
const getAllMenusByRestaurantId = async (RestaurantId) => {
  const menus = await RestaurantMenu.findAll({ where: { RestaurantId, isActive: true } });
  return menus;
};

/**
 * Supprime un menu de restaurant.
 * @param {string} menuId - L'ID du menu à supprimer.
 * @returns {Promise<number>} Le nombre de menus supprimés (1 si la suppression réussit, 0 sinon).
 */
const deleteRestaurantMenu = async (menuId) => {
  const deletedMenu = await RestaurantMenu.destroy({
    where: { id: menuId },
  });
  return deletedMenu;
};

module.exports = {
  addRestaurantMenu,
  getAllMenusByRestaurantId,
  deleteRestaurantMenu,
};
