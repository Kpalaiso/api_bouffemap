const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const Guide = db.Guide;
/**
 * Ajoute un nouveau guide.
 * @param {string} title - Le titre du guide.
 * @param {string} url_guide - L'URL du guide.
 * @param {string} url_img - L'URL de l'image du guide.
 * @returns {Promise<Guide>} - Le guide ajouté.
 */
const addGuide = async (title, url_guide, url_img) => {
  const guide = await Guide.create({
    title,
    url_guide,
    url_img,
  });
  return guide;
};

/**
 * Récupère toutes les guides actives.
 * @returns {Promise<Array<Guide>>} - Les guides actifs.
 */
const getAllActiveGuides = async () => {
  const guides = await Guide.findAll({
    where: { isActive: true },
  });
  return guides;
};

/**
 * Récupère un guide spécifique en fonction de son ID.
 * @param {number} guideId - L'ID du guide à récupérer.
 * @returns {Promise<Guide>} - Le guide spécifique.
 */
const getGuideById = async (guideId) => {
  const guide = await Guide.findOne({ where: { id: guideId } });
  if (!guide) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Guide not found', 'Guide introuvable');
  }
  return guide;
};

/**
 * Modifie un guide spécifique en fonction de son ID.
 * @param {number} guideId - L'ID du guide à modifier.
 * @param {string} title - Le nouveau titre du guide.
 * @param {string} url_guide - La nouvelle URL du guide.
 * @param {string} url_img - La nouvelle URL de l'image du guide.
 * @returns {Promise<Guide>} - Le guide modifié.
 */
const modifyGuide = async (guideId, title, url_guide, url_img) => {
  const guide = await getGuideById(guideId);

  guide.title = title;
  guide.url_guide = url_guide;
  guide.url_img = url_img;
  await guide.save();
  return guide;
};

module.exports = {
  addGuide,
  getAllActiveGuides,
  getGuideById,
  modifyGuide,
};
