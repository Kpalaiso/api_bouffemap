module.exports = (sequelize, DataTypes) => {
  const RestaurantCuisineType = sequelize.define(
    'RestaurantCuisineType',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurant_cuisine_types',
    }
  );
  RestaurantCuisineType.associate = function (models) {
    models.Restaurant.belongsToMany(models.CuisineType, { through: 'RestaurantCuisineType' });
    models.CuisineType.belongsToMany(models.Restaurant, { through: 'RestaurantCuisineType' });
  };
  return RestaurantCuisineType;
};
