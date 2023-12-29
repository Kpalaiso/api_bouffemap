module.exports = (sequelize, DataTypes) => {
  const CuisineType = sequelize.define(
    'CuisineType',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, unique: true },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'cuisine_types',
    }
  );
  CuisineType.associate = function (models) {
    CuisineType.belongsToMany(models.Restaurant, {
      through: 'RestaurantCuisineType',
    });
  };

  return CuisineType;
};
