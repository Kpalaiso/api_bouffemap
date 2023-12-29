const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const handleError = require('../utils/HandleError');
const config = require('../config/config');
const {
  userService,
  userAmbiancePreferenceService,
  userCuisinePreferenceService,
  userEstablishmentPreferenceService,
} = require('../services');

const getUsers = catchAsync(async (req, res, next) => {
  try {
    const user = await userService.getUsers();
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, user });
  } catch (err) {
    return handleError(err, res);
  }
});
const getUserById = catchAsync(async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.userId));
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, user });
  } catch (err) {
    return handleError(err, res);
  }
});

const updateUser = catchAsync(async (req, res, next) => {
  try {
    const user = await userService.updateUserById(parseInt(req.params.userId, req.body));
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, user });
  } catch (err) {
    return handleError(err, res);
  }
});

const addUserAmbiance = catchAsync(async (req, res) => {
  try {
    const { userId, ambianceId } = req.body;
    await userAmbiancePreferenceService.addUserAmbiancePreference(userId, ambianceId);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleError(error, res);
  }
});

const getUserAmbiances = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const userAmbiances = await userAmbiancePreferenceService.getAllUserAmbiancePreferencesByUserId(
      userId
    );
    res.status(httpStatus.OK).json(userAmbiances);
  } catch (error) {
    handleError(error, res);
  }
});

const deleteUserAmbiance = catchAsync(async (req, res) => {
  try {
    const { userId, ambianceId } = req.params;
    await userAmbiancePreferenceService.deleteUserAmbiancePreferences(userId, ambianceId);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleError(error, res);
  }
});

const addUserCuisineType = catchAsync(async (req, res) => {
  try {
    const { userId, cuisineTypeId } = req.body;
    await userCuisinePreferenceService.addUserCuisineType(userId, cuisineTypeId);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleError(error, res);
  }
});

const getUserCuisineTypes = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const cuisineTypes = await userCuisinePreferenceService.getUserCuisineTypes(userId);
    res.status(httpStatus.OK).json(cuisineTypes);
  } catch (error) {
    handleError(error, res);
  }
});

const deleteUserCuisineType = catchAsync(async (req, res) => {
  try {
    const { userId, cuisineTypeId } = req.params;
    await userCuisinePreferenceService.deleteUserCuisineType(userId, cuisineTypeId);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleError(error, res);
  }
});

const addUserEstablishment = catchAsync(async (req, res) => {
  try {
    const { userId, establishmentId } = req.body;
    await userEstablishmentPreferenceService.addUserEstablishment(userId, establishmentId);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    handleError(error, res);
  }
});

const getUserEstablishments = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const establishments = await userEstablishmentPreferenceService.getUserEstablishments(userId);
    res.status(httpStatus.OK).json(establishments);
  } catch (error) {
    handleError(error, res);
  }
});

const deleteUserEstablishment = catchAsync(async (req, res) => {
  try {
    const { userId, establishmentId } = req.params;
    await userEstablishmentPreferenceService.deleteUserEstablishment(userId, establishmentId);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  addUserAmbiance,
  getUserAmbiances,
  deleteUserAmbiance,
  addUserCuisineType,
  getUserCuisineTypes,
  deleteUserCuisineType,
  addUserEstablishment,
  getUserEstablishments,
  deleteUserEstablishment,
};
