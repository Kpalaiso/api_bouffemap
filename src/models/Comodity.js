module.exports = (sequelize, DataTypes) => {
  const Comodity = sequelize.define(
    'Comodity',
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
      tableName: 'comodities',
    }
  );
  Comodity.associate = function (models) {
    Comodity.belongsToMany(models.Restaurant, { through: 'RestaurantComodity' });
  };

  return Comodity;
};
