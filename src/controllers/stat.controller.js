const httpStatus = require('http-status');
const handleError = require('../utils/HandleError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

const { userService, restaurantCuisineTypeService, restaurantService } = require('../services');

const getStatistics = catchAsync(async (req, res) => {
  try {
    const restaurantCount = await restaurantService.getTotalRestaurantCount();
    const restaurantCountByMonth = await restaurantService.getRestaurantCountByMonth();
    const userCount = await userService.getTotalUserCount();
    const userCountByMonth = await userService.getUserCountByMonth();
    const topVisitedRestaurants = await restaurantService.getTopVisitedRestaurants();
    const restaurantCountByCuisineType =
      await restaurantCuisineTypeService.getRestaurantCountByCuisineType();

    const statistics = {
      restaurantCount,
      restaurantCountByMonth,
      userCount,
      userCountByMonth,
      topVisitedRestaurants,
      restaurantCountByCuisineType,
    };

    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, statistics });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = {
  getStatistics,
};
