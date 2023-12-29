module.exports = (sequelize, DataTypes) => {
  const UserRestaurantFavoris = sequelize.define(
    'UserRestaurantFavoris',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user-restaurant-favoris',
    }
  );
  UserRestaurantFavoris.associate = function (models) {
    UserRestaurantFavoris.belongsTo(models.Restaurant);
    // models.User.belongsToMany(models.Restaurant, { through: UserRestaurantFavoris });
    // models.Restaurant.belongsToMany(models.User, { through: UserRestaurantFavoris });
  };
  return UserRestaurantFavoris;
};
