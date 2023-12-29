const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const handleError = require('../utils/HandleError');
const config = require('../config/config');
const { userRestaurantFavorisService } = require('../services');

const addUserRestaurantFavoris = catchAsync(async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    const newFavoris = await userRestaurantFavorisService.addUserRestaurantFavoris(
      userId,
      restaurantId
    );
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, newFavoris });
  } catch (error) {
    handleError(error, res);
  }
});

const getUserRestaurantFavoris = catchAsync(async (req, res) => {
  try {
    const { userId } = req.params;
    const favoris = await userRestaurantFavorisService.getUserRestaurantFavoris(userId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, favoris });
  } catch (error) {
    handleError(error, res);
  }
});

const removeUserRestaurantFavoris = catchAsync(async (req, res) => {
  try {
    const { userId, restaurantId } = req.body;
    await userRestaurantFavorisService.deleteUserRestaurantFavoris(userId, restaurantId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = {
  addUserRestaurantFavoris,
  getUserRestaurantFavoris,
  removeUserRestaurantFavoris,
};
