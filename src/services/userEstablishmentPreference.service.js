const { UserEstablishmentPreference, Establishment } = require('../models');

/**
 * Ajoute une nouvelle préférence d'utilisateur sur un établissement
 * @param {number} UserId - L'ID de l'utilisateur
 * @param {number} EstablishmentId - L'ID de l'établissement
 * @returns {Promise<UserEstablishmentPreference>}
 */
const addUserEstablishmentPreference = async (UserId, EstablishmentId) => {
  // Crée une nouvelle préférence d'utilisateur
  const userEstablishmentPreference = await UserEstablishmentPreference.create({
    UserId,
    EstablishmentId,
  });

  return userEstablishmentPreference;
};

/**
 * Récupère toutes les préférences des utilisateurs en fonction de l'ID sur les établissements
 * @param {number} UserId - L'ID de l'utilisateur
 * @returns {Promise<Array<UserEstablishmentPreference>>}
 */
const getAllUserEstablishmentPreferencesByUserId = async (UserId) => {
  const userEstablishmentPreferences = await UserEstablishmentPreference.findAll({
    where: { UserId, isActive: true },
    include: [{ model: Establishment }],
  });
  return userEstablishmentPreferences;
};

/**
 * Supprime les préférences d'un utilisateur pour un établissement
 * @param {number} UserId - L'ID de l'utilisateur
 * @param {number} EstablishmentId - L'ID de l'établissement
 * @returns {Promise<void>}
 */
const deleteUserEstablishmentPreferences = async (UserId, EstablishmentId) => {
  // Supprime les préférences de l'utilisateur pour l'établissement
  await UserEstablishmentPreference.destroy({
    where: { UserId, EstablishmentId },
  });
};

module.exports = {
  addUserEstablishmentPreference,
  getAllUserEstablishmentPreferencesByUserId,
  deleteUserEstablishmentPreferences,
};
