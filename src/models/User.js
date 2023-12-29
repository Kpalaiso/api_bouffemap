module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      localisation: { type: DataTypes.STRING },
      phoneNumber: { type: DataTypes.STRING, unique: true },
      language: { type: DataTypes.STRING, defaultValue: 'fr' },
      typeAuth: { type: DataTypes.STRING, defaultValue: 'authEmail' }, // authGoogle, authFacebook, authEmail
      device: { type: DataTypes.STRING },
      notification: { type: DataTypes.BOOLEAN, defaultValue: true },
      termsOfUse: { type: DataTypes.BOOLEAN, defaultValue: true },
      PersonalData: { type: DataTypes.BOOLEAN },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
      isOwner: { type: DataTypes.BOOLEAN, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'users',
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Token, {
      as: 'Tokens',
    });
    User.belongsToMany(models.Role, { through: models.UserRole });
  };

  User.prototype.isEmailTaken = async function (email) {
    const user = await User.findOne({ where: { email: email } });
    return !!user;
  };
  User.prototype.isPhoneNumberTaken = async function (phoneNumber) {
    const user = await User.findOne({ where: { phoneNumber: phoneNumber } });
    return !!user;
  };
  return User;
};
