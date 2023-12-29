module.exports = (sequelize, DataTypes) => {
  const RestaurantPhoto = sequelize.define(
    'RestaurantPhoto',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      urlImage: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurant_photos',
    }
  );
  RestaurantPhoto.associate = function (models) {
    RestaurantPhoto.belongsTo(models.Restaurant, {
      foreignKey: 'RestaurantId',
      as: 'Restaurant',
    });
  };

  return RestaurantPhoto;
};
