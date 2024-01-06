const httpStatus = require('http-status');
const handleError = require('../utils/HandleError');
const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');

const {
  restaurantService,
  restaurantPhotoService,
  restaurantMenuService,
  restaurantAmbianceService,
  restaurantCuisineTypeService,
  restaurantComodityService,
} = require('../services');

const createRestaurant = catchAsync(async (req, res) => {
  try {
    const restaurantData = req.body;
    const createdRestaurant = await restaurantService.createRestaurant(restaurantData);
    const restaurantId = createdRestaurant.id;

    // Création des photos du restaurant
    const restaurantPhotos = restaurantData.photos;
    for (const restaurantPhoto of restaurantPhotos) {
      await restaurantPhotoService.addRestaurantPhoto(restaurantId, restaurantPhoto.urlImage);
    }

    // Création des menus du restaurant
    const restaurantMenus = restaurantData.menus;
    for (const restaurantMenu of restaurantMenus) {
      await restaurantMenuService.addRestaurantMenu(
        restaurantId,
        restaurantMenu.title,
        restaurantMenu.urlMenu
      );
    }

    // Création des ambiances du restaurant
    const restaurantAmbiances = restaurantData.ambiances;
    for (const restaurantAmbiance of restaurantAmbiances) {
      await restaurantAmbianceService.addRestaurantAmbiance(
        restaurantId,
        restaurantAmbiance.AmbianceId
      );
    }

    // Création des types de cuisine du restaurant
    const restaurantCuisineTypes = restaurantData.cuisineTypes;
    for (const restaurantCuisineType of restaurantCuisineTypes) {
      await restaurantCuisineTypeService.addRestaurantCuisineType(
        restaurantId,
        restaurantCuisineType.CuisineTypeId
      );
    }

    // Création des commodités du restaurant
    const restaurantCommodities = restaurantData.commodities;
    for (const restaurantComodity of restaurantCommodities) {
      await restaurantComodityService.addRestaurantCommodity(
        restaurantId,
        restaurantComodity.CommodityId
      );
    }
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, createdRestaurant });
  } catch (error) {
    handleError(error, res);
  }
});

const updateRestaurantbyId = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantData = req.body;
    await restaurantService.updateRestaurantById(id, restaurantData);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    handleError(error, res);
  }
});

const getRestaurants = catchAsync(async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllActiveRestaurants();

    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurants });
  } catch (error) {
    handleError(error, res);
  }
});

const getRestaurantById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.getRestaurantById(id);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurant });
  } catch (error) {
    handleError(error, res);
  }
});

// Fonctions pour RestaurantAmbiance

async function addRestaurantAmbiance(req, res) {
  try {
    const { restaurantId, ambianceId } = req.body;
    const restaurantAmbiance = await restaurantAmbianceService.addRestaurantAmbiance(
      restaurantId,
      ambianceId
    );
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantAmbiance });
  } catch (error) {
    handleError(error, res);
  }
}

async function getRestaurantAmbiancesByRestaurantId(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurantAmbiances =
      await restaurantAmbianceService.getRestaurantAmbiancesByRestaurantId(restaurantId);

    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantAmbiances });
  } catch (error) {
    handleError(error, res);
  }
}

async function deleteRestaurantAmbiances(req, res) {
  try {
    const { restaurantId, ambianceId } = req.params;
    await restaurantAmbianceService.deleteRestaurantAmbiances(restaurantId, ambianceId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
}

// Fonctions pour RestaurantCommodity

async function addRestaurantCommodity(req, res) {
  try {
    const { restaurantId, commodityId } = req.body;
    const restaurantComodity = await restaurantComodityService.addRestaurantCommodity(
      restaurantId,
      commodityId
    );
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantComodity });
  } catch (error) {
    handleError(error, res);
  }
}

async function getRestaurantCommoditiesByRestaurantId(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurantComodities =
      await restaurantComodityService.getRestaurantCommoditiesByRestaurantId(restaurantId);

    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantComodities });
  } catch (error) {
    handleError(error, res);
  }
}

async function deleteRestaurantCommodities(req, res) {
  try {
    const { restaurantId, commodityId } = req.params;
    await restaurantComodityService.deleteRestaurantCommodities(restaurantId, commodityId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
}

// Fonctions pour RestaurantCuisineType

async function addRestaurantCuisineType(req, res) {
  try {
    const { restaurantId, cuisineTypeId } = req.body;
    const restaurantCuisineType = await restaurantCuisineTypeService.addRestaurantCuisineType(
      restaurantId,
      cuisineTypeId
    );
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantCuisineType });
  } catch (error) {
    handleError(error, res);
  }
}

async function getRestaurantCuisineTypesByRestaurantId(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurantCuisineTypes =
      await restaurantCuisineTypeService.getRestaurantCuisineTypesByRestaurantId(restaurantId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantCuisineTypes });
  } catch (error) {
    handleError(error, res);
  }
}

async function deleteRestaurantCuisineTypes(req, res) {
  try {
    const { restaurantId, cuisineTypeId } = req.params;
    await restaurantCuisineTypeService.deleteRestaurantCuisineTypes(restaurantId, cuisineTypeId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
}

// Fonctions pour RestaurantMenu

async function addRestaurantMenu(req, res) {
  try {
    const { restaurantId, title, urlMenu } = req.body;
    const restaurantMenu = await restaurantMenuService.addRestaurantMenu(
      restaurantId,
      title,
      urlMenu
    );
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantMenu });
  } catch (error) {
    handleError(error, res);
  }
}

async function getAllMenusByRestaurantId(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurantMenus = await restaurantMenuService.getAllMenusByRestaurantId(restaurantId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantMenus });
  } catch (error) {
    handleError(error, res);
  }
}

async function deleteRestaurantMenu(req, res) {
  try {
    const { restaurantId, menuId } = req.params;
    await restaurantMenuService.deleteRestaurantMenu(restaurantId, menuId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
}

// Fonctions pour RestaurantPhoto

async function addRestaurantPhoto(req, res) {
  try {
    const { restaurantId, urlImage } = req.body;
    const restaurantPhoto = await restaurantPhotoService.addRestaurantPhoto(restaurantId, urlImage);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantPhoto });
  } catch (error) {
    handleError(error, res);
  }
}

async function getAllPhotosByRestaurantId(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurantPhotos = await restaurantPhotoService.getAllPhotosByRestaurantId(restaurantId);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurantPhotos });
  } catch (error) {
    handleError(error, res);
  }
}

async function deleteRestaurantPhoto(req, res) {
  try {
    const { restaurantId, photoId } = req.params;
    await restaurantPhotoService.deleteRestaurantPhoto(restaurantId, photoId);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (error) {
    handleError(error, res);
  }
}

async function filterRestaurants(req, res) {
  try {
    const {
      location,
      minBudget,
      maxBudget,
      cuisineTypeIds,
      ambiancesIds,
      comodityIds,
      establishmentIds,
    } = req.body;

    const restaurants = await restaurantService.filterRestaurants({
      location,
      minBudget,
      maxBudget,
      cuisineTypeIds,
      ambiancesIds,
      comodityIds,
      establishmentIds,
    });
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, restaurants });
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  createRestaurant,
  updateRestaurantbyId,
  getRestaurants,
  getRestaurantById,
  addRestaurantAmbiance,
  getRestaurantAmbiancesByRestaurantId,
  deleteRestaurantAmbiances,
  addRestaurantCommodity,
  getRestaurantCommoditiesByRestaurantId,
  deleteRestaurantCommodities,
  addRestaurantCuisineType,
  getRestaurantCuisineTypesByRestaurantId,
  deleteRestaurantCuisineTypes,
  addRestaurantMenu,
  getAllMenusByRestaurantId,
  deleteRestaurantMenu,
  addRestaurantPhoto,
  getAllPhotosByRestaurantId,
  deleteRestaurantPhoto,
  filterRestaurants,
};
