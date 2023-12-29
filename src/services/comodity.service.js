const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const Comodity = db.Comodity;
/**
 * Ajoute une nouvelle comodity
 * @param {string} name - Le nom de la comodity
 * @returns {Promise<Comodity>}
 */
const createComodity = async (name, description) => {
  // Crée une nouvelle comodity
  const comodity = await Comodity.create({
    name,
    description,
  });
  return comodity;
};

/**
 * Récupère toutes les comodities actives
 * @returns {Promise<Array<Comodity>>}
 */
const getAllComodities = async () => {
  const comodities = await Comodity.findAll({
    where: { isActive: true },
  });
  return comodities;
};

/**
 * Récupère une comodity spécifique par ID
 * @param {number} id - L'ID de la comodity
 * @returns {Promise<Comodity>}
 */
const getComodityById = async (id) => {
  const comodity = await Comodity.findOne({
    where: { id, isActive: true },
  });
  if (!comodity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cuisnie Type not found', 'Comodity non trouvée');
  }
  return comodity;
};

/**
 * Modifie une comodity spécifique par ID
 * @param {number} id - L'ID de la comodity
 * @param {string} name - Le nouveau nom de la comodity
 * @returns {Promise<Comodity>}
 */
const updateComodityById = async (id, name) => {
  const comodity = await getComodityById(id);

  // Met à jour les propriétés de la comodity
  comodity.name = name;

  await comodity.save();

  return comodity;
};

module.exports = {
  createComodity,
  getAllComodities,
  getComodityById,
  updateComodityById,
};
