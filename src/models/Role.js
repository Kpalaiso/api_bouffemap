module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: { type: DataTypes.STRING, unique: true }, // ROLE_APP; ROLE_RESTAURANT; ROLE_ADMIN
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'roles',
    }
  );
  Role.associate = function (models) {
    Role.belongsToMany(models.User, { through: models.UserRole });
  };

  return Role;
};
