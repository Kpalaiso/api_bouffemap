module.exports = (sequelize, DataTypes) => {
  const RestaurantAmbiance = sequelize.define(
    'RestaurantAmbiance',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurant_ambiances',
    }
  );
  RestaurantAmbiance.associate = function (models) {
    models.Restaurant.belongsToMany(models.Ambiance, { through: 'RestaurantAmbiance' });
    models.Ambiance.belongsToMany(models.Restaurant, { through: 'RestaurantAmbiance' });
  };
  return RestaurantAmbiance;
};
