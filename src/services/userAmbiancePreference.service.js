const { UserAmbiancePreference, Ambiance } = require('../models');

/**
 * Ajoute une nouvelle préférence d'utilisateur sur une ambiance
 * @param {number} UserId - L'ID de l'utilisateur
 * @param {string} AmbianceId - L'ID de L'ambiance préférée de l'utilisateur
 * @returns {Promise<UserAmbiancePreference>}
 */
const addUserAmbiancePreference = async (UserId, AmbianceId) => {
  // Crée une nouvelle préférence d'utilisateur
  const userAmbiancePreference = await UserAmbiancePreference.create({
    UserId,
    AmbianceId,
  });

  return userAmbiancePreference;
};

/**
 * Récupère toutes les préférences des utilisateurs en fonction de l'ID
 * @param {number} UserId - L'ID de l'utilisateur
 * @returns {Promise<Array<UserAmbiancePreference>>}
 */
const getAllUserAmbiancePreferencesByUserId = async (UserId) => {
  const userAmbiancePreferences = await UserAmbiancePreference.findAll({
    where: { UserId, isActive: true },
    include: [{ model: Ambiance }],
  });
  return userAmbiancePreferences;
};

/**
 * Supprime les préférences d'un utilisateur pour une ambiance
 * @param {number} UserId - L'ID de l'utilisateur
 * @param {string} AmbianceId - L'ID de L'ambiance à supprimer
 * @returns {Promise<void>}
 */
const deleteUserAmbiancePreferences = async (UserId, AmbianceId) => {
  // Supprime les préférences de l'utilisateur pour l'ambiance
  await UserAmbiancePreference.destroy({
    where: { UserId, AmbianceId },
  });
};

module.exports = {
  addUserAmbiancePreference,
  getAllUserAmbiancePreferencesByUserId,
  deleteUserAmbiancePreferences,
};
