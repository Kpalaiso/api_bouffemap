module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'user-role',
    }
  );

  return UserRole;
};
