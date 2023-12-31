const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const handleError = require('../utils/HandleError');
const config = require('../config/config');
const guideServices = require('../services/guide.service');

const addGuide = catchAsync(async (req, res) => {
  try {
    const { title, url_guide, url_img } = req.body;
    const newGuide = await guideServices.addGuide(title, url_guide, url_img);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newGuide });
  } catch (error) {
    handleError(error, req, res);
  }
});

const getAllActiveGuides = catchAsync(async (req, res) => {
  try {
    const guides = await guideServices.getAllActiveGuides();
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, guides });
  } catch (error) {
    handleError(error, req, res);
  }
});

const getGuideById = catchAsync(async (req, res) => {
  try {
    const { guideId } = req.params;
    const guide = await guideServices.getGuideById(guideId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, guide });
  } catch (error) {
    handleError(error, req, res);
  }
});
const modifyGuide = catchAsync(async (req, res) => {
  try {
    const { guideId } = req.params;
    const { title, url_guide, url_img } = req.body;
    const modifiedGuide = await guideServices.modifyGuide(guideId, title, url_guide, url_img);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, modifiedGuide });
  } catch (error) {
    handleError(error, req, res);
  }
});

const deleteGuide = catchAsync(async (req, res) => {
  try {
    const { guideId } = req.params;
    await guideServices.deleteGuide(guideId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, req, res);
  }
});

module.exports = {
  addGuide,
  getAllActiveGuides,
  getGuideById,
  modifyGuide,
  deleteGuide,
};
