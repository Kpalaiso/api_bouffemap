module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      img_cover: { type: DataTypes.STRING },
      img_profil: { type: DataTypes.STRING },
      commune: { type: DataTypes.STRING },
      localisation: { type: DataTypes.STRING },
      contact: { type: DataTypes.STRING },
      budget_min: { type: DataTypes.FLOAT },
      budget_max: { type: DataTypes.FLOAT },
      horaire: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      etablissementType: { type: DataTypes.STRING },
      visits: { type: DataTypes.INTEGER, defaultValue: 0 },
      averageNote: { type: DataTypes.FLOAT, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurants',
    }
  );

  Restaurant.associate = function (models) {
    Restaurant.belongsToMany(models.CuisineType, { through: 'RestaurantCuisineType' });
    Restaurant.belongsToMany(models.Comodity, { through: 'RestaurantComodity' });
    Restaurant.belongsToMany(models.Ambiance, { through: 'RestaurantAmbiance' });
    Restaurant.belongsToMany(models.User, { through: 'UserRestaurantFavoris' });
    Restaurant.belongsToMany(models.User, { through: 'UserRestaurantRex' });

    Restaurant.hasMany(models.RestaurantPhoto);
    Restaurant.hasMany(models.RestaurantMenu);
    Restaurant.hasMany(models.UserRestaurantRex);
  };

  return Restaurant;
};
