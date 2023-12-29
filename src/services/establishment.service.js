const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const Establishment = db.Establishment;

/**
 * Crée un nouvel établissement avec le nom spécifié.
 * @param {string} name - Le nom de l'établissement.
 * @returns {Promise<Establishment>} - La nouvelle instance de l'établissement créée.
 */
const createEstablishment = async (name) => {
  const newEstablishment = await Establishment.create({ name });
  return newEstablishment;
};
/**
 * Récupère un établissement par son ID.
 * @param {string} id - L'ID de l'établissement à récupérer.
 * @returns {Promise<Establishment>} - L'établissement correspondant à l'ID spécifié.
 */
const getEstablishmentById = async (id) => {
  const establishment = await Establishment.findOne({
    where: { id, isActive: true },
  });
  if (!establishment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Establishment not found');
  }
  return establishment;
};

/**
 * Récupère la liste de tous les établissements.
 * @returns {Promise<Establishment[]>} - Un tableau contenant tous les établissements.
 */
const getAllEstablishments = async () => {
  const establishments = await Establishment.findAll({
    where: { isActive: true },
  });
  return establishments;
};

/**
 * Modifie un établissement existant en utilisant son ID.
 * @param {string} id - L'ID de l'établissement à modifier.
 * @param {string} name - Le nom de l'établissement à mettre à jour.
 * @returns {Promise<boolean>} - Une valeur booléenne indiquant si l'établissement a été mis à jour avec succès.
 */
const updateEstablishmentById = async (id, name) => {
  const establishment = await getEstablishmentById(id);

  // Met à jour les propriétés de ll'etablissement
  establishment.name = name;
  await establishment.save();
};

module.exports = {
  createEstablishment,
  updateEstablishmentById,
  getAllEstablishments,
  getEstablishmentById,
};
