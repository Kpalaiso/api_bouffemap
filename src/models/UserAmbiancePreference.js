module.exports = (sequelize, DataTypes) => {
  const UserAmbiancePreference = sequelize.define(
    'UserAmbiancePreference',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user_ambiance_preferences',
    }
  );
  UserAmbiancePreference.associate = function (models) {
    UserAmbiancePreference.belongsTo(models.Ambiance);
    // models.User.belongsToMany(models.Ambiance, { through: UserAmbiancePreference });
    // models.Ambiance.belongsToMany(models.User, { through: UserAmbiancePreference });
  };
  return UserAmbiancePreference;
};
