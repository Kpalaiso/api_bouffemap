const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const handleError = require('../utils/HandleError');
const config = require('../config/config');
const {
  comodityService,
  cuisineTypeService,
  ambianceService,
  establishmentService,
} = require('../services');

const createAmbiance = catchAsync(async (req, res) => {
  try {
    const newAmbiance = await ambianceService.createAmbiance(req.body.name);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newAmbiance });
  } catch (error) {
    handleError(error, res);
  }
});

const updateAmbiance = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAmbiance = await ambianceService.updateAmbianceById(id, req.body.name);
    if (!updatedAmbiance) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'Ambiance not found' });
    } else {
      res.status(httpStatus.OK).send({ status: config.statusRequestSucces, updatedAmbiance });
    }
  } catch (error) {
    handleError(error, res);
  }
});

const getAllAmbiances = catchAsync(async (req, res) => {
  try {
    const ambiances = await ambianceService.getAllAmbiances();
    res.status(httpStatus.OK).send(ambiances);
  } catch (error) {
    handleError(error, res);
  }
});

const createComodity = catchAsync(async (req, res) => {
  try {
    const newComodity = await comodityService.createComodity(req.body.name);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newComodity });
  } catch (error) {
    handleError(error, res);
  }
});

const updateComodity = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComodity = await comodityService.updateComodityById(id, req.body.name);
    if (!updatedComodity) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'Comodity not found' });
    } else {
      res.status(httpStatus.OK).send({ status: config.statusRequestSucces, updatedComodity });
    }
  } catch (error) {
    handleError(error, res);
  }
});

const getAllComodities = catchAsync(async (req, res) => {
  try {
    const comodities = await comodityService.getAllComodities();
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, comodities });
  } catch (error) {
    handleError(error, res);
  }
});

const createCuisineType = catchAsync(async (req, res) => {
  try {
    const newCuisineType = await cuisineTypeService.createCuisineType(req.body.name);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newCuisineType });
  } catch (error) {
    handleError(error, res);
  }
});

const updateCuisineType = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCuisineType = await cuisineTypeService.updateCuisineTypeById(id, req.body.name);
    if (!updatedCuisineType) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'CuisineType not found' });
    } else {
      res.status(httpStatus.OK).send({ status: config.statusRequestSucces, updatedCuisineType });
    }
  } catch (error) {
    handleError(error, res);
  }
});

const getAllCuisineTypes = catchAsync(async (req, res) => {
  try {
    const cuisineTypes = await cuisineTypeService.getAllCuisineTypes();
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, cuisineTypes });
  } catch (error) {
    handleError(error, res);
  }
});

const createEstablishment = catchAsync(async (req, res) => {
  try {
    const newEstablishment = await establishmentService.createEstablishment(req.body);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newEstablishment });
  } catch (error) {
    handleError(error, res);
  }
});

const getAllEstablishments = catchAsync(async (req, res) => {
  try {
    const establishments = await establishmentService.getAllEstablishments();
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, establishments });
  } catch (error) {
    handleError(error, res);
  }
});

const updateEstablishment = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEstablishment = await establishmentService.updateEstablishmentById(id, req.body);
    if (!updatedEstablishment) {
      res.status(httpStatus.NOT_FOUND).send({ message: 'Establishment not found' });
    } else {
      res.status(httpStatus.OK).send({ status: config.statusRequestSucces, updatedEstablishment });
    }
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = {
  createAmbiance,
  updateAmbiance,
  getAllAmbiances,
  createComodity,
  updateComodity,
  getAllComodities,
  createCuisineType,
  updateCuisineType,
  getAllCuisineTypes,
  createEstablishment,
  getAllEstablishments,
  updateEstablishment,
};
