module.exports = (sequelize, DataTypes) => {
  const RestaurantComodity = sequelize.define(
    'RestaurantComodity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurant_comodities',
    }
  );
  RestaurantComodity.associate = function (models) {
    // models.RestaurantComodity.belongsToMany(models.Restaurant, { through: 'RestaurantComodity' });
    // models.RestaurantComodity.belongsToMany(models.Comodity, { through: 'RestaurantComodity' });
  };
  return RestaurantComodity;
};
