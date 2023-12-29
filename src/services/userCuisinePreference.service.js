const db = require('../models/index');
const UserCuisinePreference = db.UserCuisinePreference;
const CuisineType = db.CuisineType;
/**
 * Ajoute une cuisine à un utilisateur.
 * @param {number} UserId - L'ID de l'utilisateur.
 * @param {number} CuisineTypeId - L'ID du type de cuisine à ajouter.
 * @returns {Promise<UserCuisinePreference>} - La préférence de cuisine ajoutée.
 */
const addUserCuisinePreference = async (UserId, CuisineTypeId) => {
  const userCuisinePreference = await UserCuisinePreference.create({
    UserId,
    CuisineTypeId,
  });
  return userCuisinePreference;
};

/**
 * Récupère les cuisines d'un utilisateur en fonction de son ID.
 * @param {number} UserId - L'ID de l'utilisateur.
 * @returns {Promise<Array<UserCuisinePreference>>} - Les préférences de cuisine de l'utilisateur.
 */
const getUserCuisinePreferencesByUserId = async (UserId) => {
  const userCuisinePreferences = await UserCuisinePreference.findAll({
    where: { UserId, isActive: true },
    include: [{ model: CuisineType }],
  });
  return userCuisinePreferences;
};

/**
 * Supprime les cuisines d'un utilisateur en fonction de son ID.
 * @param {number} UserId - L'ID de l'utilisateur.
 * @param {number} CuisineTypeId - L'ID du type de cuisine à supprimer.
 * @returns {Promise<void>}
 */
const deleteUserCuisinePreferences = async (UserId, CuisineTypeId) => {
  await UserCuisinePreference.destroy({
    where: { UserId, CuisineTypeId },
  });
};

module.exports = {
  addUserCuisinePreference,
  getUserCuisinePreferencesByUserId,
  deleteUserCuisinePreferences,
};
