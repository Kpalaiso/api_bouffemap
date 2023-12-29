const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const CuisineType = db.CuisineType;

/**
 * Ajoute une nouvelle cuisine type
 * @param {string} name - Le nom de la cuisine type
 * @returns {Promise<CuisineType>}
 */
const createCuisineType = async (name) => {
  // Crée une nouvelle cuisine type
  const cuisineType = await CuisineType.create({
    name,
  });

  return cuisineType;
};

/**
 * Récupère toutes les cuisine types actives
 * @returns {Promise<Array<CuisineType>>}
 */
const getAllCuisineTypes = async () => {
  const cuisineTypes = await CuisineType.findAll({
    where: { isActive: true },
  });
  return cuisineTypes;
};

/**
 * Récupère une cuisine type spécifique par ID
 * @param {number} id - L'ID de la cuisine type
 * @returns {Promise<CuisineType>}
 */
const getCuisineTypeById = async (id) => {
  const cuisineType = await CuisineType.findOne({
    where: { id, isActive: true },
  });
  if (!cuisineType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cuisine Type not found', 'Cuisine type non trouvé');
  }
  return cuisineType;
};

/**
 * Modifie une cuisine type spécifique par ID
 * @param {number} id - L'ID de la cuisine type
 * @param {string} name - Le nouveau nom de la cuisine type
 * @returns {Promise<CuisineType>}
 */
const updateCuisineTypeById = async (id, name, description) => {
  const cuisineType = await getCuisineTypeById(id);

  // Met à jour les propriétés de la cuisine type
  cuisineType.name = name;
  await cuisineType.save();

  return cuisineType;
};

module.exports = {
  createCuisineType,
  getAllCuisineTypes,
  getCuisineTypeById,
  updateCuisineTypeById,
};
