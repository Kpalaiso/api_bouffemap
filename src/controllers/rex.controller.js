const handleError = require('../utils/HandleError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const userRestaurantRexService = require('../services/userRestaurantRex.service');

const addRexToRestaurant = catchAsync(async (req, res) => {
  try {
    const {
      userId,
      restaurantId,
      beauty_restaurant,
      healthiness_restaurant,
      quality_reception,
      quality_food,
      speed_service,
      comodity,
      payment_diversity,
      rex,
    } = req.body;
    const createdRex = await userRestaurantRexService.addUserRestaurantRex(
      userId,
      restaurantId,
      beauty_restaurant,
      healthiness_restaurant,
      quality_reception,
      quality_food,
      speed_service,
      comodity,
      payment_diversity,
      rex
    );
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, createdRex });
  } catch (error) {
    handleError(error, res);
  }
});

const getRestaurantRexList = catchAsync(async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const rexList = await userRestaurantRexService.getRestaurantRex(restaurantId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, rexList });
  } catch (error) {
    handleError(error, res);
  }
});

const deleteRex = catchAsync(async (req, res) => {
  try {
    const { rexId } = req.params;
    await userRestaurantRexService.deleteRestaurantRexbyId(rexId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = {
  addRexToRestaurant,
  getRestaurantRexList,
  deleteRex,
};
