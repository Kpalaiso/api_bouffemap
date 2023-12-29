const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const Ambiance = db.Ambiance;
/**
 * Ajoute une nouvelle ambiance
 * @param {string} name - Le nom de l'ambiance
 * @returns {Promise<Ambiance>}
 */
const createAmbiance = async (name) => {
  // Crée une nouvelle ambiance
  const ambiance = await Ambiance.create({
    name,
  });

  return ambiance;
};

/**
 * Récupère toutes les ambiances actives
 * @returns {Promise<Array<Ambiance>>}
 */
const getAllAmbiances = async () => {
  const ambiances = await Ambiance.findAll({
    where: { isActive: true },
  });
  return ambiances;
};

/**
 * Récupère une ambiance spécifique par ID
 * @param {number} id - L'ID de l'ambiance
 * @returns {Promise<Ambiance>}
 */
const getAmbianceById = async (id) => {
  const ambiance = await Ambiance.findOne({
    where: { id, isActive: true },
  });
  if (!ambiance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ambiance not found', 'Ambiance non trouvée');
  }
  return ambiance;
};

/**
 * Modifie une ambiance spécifique par ID
 * @param {number} id - L'ID de l'ambiance
 * @param {string} name - Le nouveau nom de l'ambiance
 * @returns {Promise<Ambiance>}
 */
const updateAmbianceById = async (id, name) => {
  const ambiance = await getAmbianceById(id);

  // Met à jour les propriétés de l'ambiance
  ambiance.name = name;
  await ambiance.save();

  return ambiance;
};

module.exports = {
  createAmbiance,
  getAllAmbiances,
  getAmbianceById,
  updateAmbianceById,
};
