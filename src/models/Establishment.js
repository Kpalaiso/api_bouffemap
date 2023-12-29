module.exports = (sequelize, DataTypes) => {
  const Establishment = sequelize.define(
    'Establishment',
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
      tableName: 'establishments',
    }
  );
  Establishment.associate = function (models) {
    Establishment.belongsToMany(models.User, {
      through: 'UserEstablishmentPreference',
    });
  };

  return Establishment;
};
