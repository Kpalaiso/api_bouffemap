module.exports = (sequelize, DataTypes) => {
  const UserRestaurantRex = sequelize.define(
    'UserRestaurantRex',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      beauty_restaurant: { type: DataTypes.INTEGER },
      healthiness_restaurant: { type: DataTypes.INTEGER },
      quality_reception: { type: DataTypes.INTEGER },
      quality_food: { type: DataTypes.INTEGER },
      speed_service: { type: DataTypes.INTEGER },
      comodity: { type: DataTypes.INTEGER },
      payment_diversity: { type: DataTypes.INTEGER },
      averageNote: { type: DataTypes.INTEGER },
      rex: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user-restaurant-rex',
    }
  );

  UserRestaurantRex.associate = function (models) {
    UserRestaurantRex.belongsTo(models.Restaurant);
    // models.User.belongsToMany(models.Restaurant, { through: UserRestaurantRex });
    // models.Restaurant.belongsToMany(models.User, { through: UserRestaurantRex });
  };

  return UserRestaurantRex;
};
