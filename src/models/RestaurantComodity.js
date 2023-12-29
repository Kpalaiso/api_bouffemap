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
    models.Restaurant.belongsToMany(models.Comodity, { through: 'RestaurantComodity' });
    models.Comodity.belongsToMany(models.Restaurant, { through: 'RestaurantComodity' });
  };
  return RestaurantComodity;
};
