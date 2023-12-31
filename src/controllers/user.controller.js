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
    const data = req.body;
    const ambiances = data.ambianceIds;
    const userId = data.userId;
    for (const ambianceId of ambiances) {
      await userAmbiancePreferenceService.addUserAmbiancePreference(userId, ambianceId);
    }
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces });
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
});

const getUserAmbiances = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const userAmbiances = await userAmbiancePreferenceService.getAllUserAmbiancePreferencesByUserId(
      userId
    );
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, userAmbiances });
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
    const data = req.body;
    const cuisineTypes = data.cuisineTypeIds;
    const userId = data.userId;
    for (const cuisineTypeId of cuisineTypes) {
      await userCuisinePreferenceService.addUserCuisinePreference(userId, cuisineTypeId);
    }
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
});

const getUserCuisineTypes = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const cuisineTypes = await userCuisinePreferenceService.getUserCuisineTypes(userId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, cuisineTypes });
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
    const data = req.body;
    const establishments = data.establishmentIds;
    const userId = data.userId;
    for (const establishmentId of establishments) {
      await userEstablishmentPreferenceService.addUserEstablishmentPreference(
        userId,
        establishmentId
      );
    }
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces });
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
