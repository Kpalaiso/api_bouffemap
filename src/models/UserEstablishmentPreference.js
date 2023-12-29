module.exports = (sequelize, DataTypes) => {
  const UserEstablishmentPreference = sequelize.define(
    'UserEstablishmentPreference',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user_establishhment_preferences',
    }
  );
  UserEstablishmentPreference.associate = function (models) {
    models.User.belongsToMany(models.Establishment, {
      through: UserEstablishmentPreference,
    });
    models.Establishment.belongsToMany(models.User, {
      through: UserEstablishmentPreference,
    });
  };
  return UserEstablishmentPreference;
};
