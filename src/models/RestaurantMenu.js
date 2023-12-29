module.exports = (sequelize, DataTypes) => {
  const RestaurantMenu = sequelize.define(
    'RestaurantMenu',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING },
      url_menu: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurant_menus',
    }
  );
  RestaurantMenu.associate = function (models) {
    RestaurantMenu.belongsTo(models.Restaurant, { foreignKey: 'RestaurantId', as: 'Restaurant' });
  };

  return RestaurantMenu;
};
