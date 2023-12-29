module.exports = (sequelize, DataTypes) => {
  const Ambiance = sequelize.define(
    'Ambiance',
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
      tableName: 'ambiances',
    }
  );
  Ambiance.associate = function (models) {
    Ambiance.belongsToMany(models.Restaurant, { through: 'RestaurantAmbiance' });
  };

  return Ambiance;
};
