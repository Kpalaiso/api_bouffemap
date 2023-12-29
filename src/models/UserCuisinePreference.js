module.exports = (sequelize, DataTypes) => {
  const UserCuisinePreference = sequelize.define(
    'UserCuisinePreference',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user_cuisine_preferences',
    }
  );
  UserCuisinePreference.associate = function (models) {
    UserCuisinePreference.belongsTo(models.CuisineType);
    // models.User.belongsToMany(models.CuisineType, { through: UserCuisinePreference });
    // models.CuisineType.belongsToMany(models.User, { through: UserCuisinePreference });
  };
  return UserCuisinePreference;
};
