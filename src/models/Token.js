module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: { type: DataTypes.STRING }, //enum(Mail ou phonecode)
      expires: { type: DataTypes.DATE },
      blacklisted: { type: DataTypes.BOOLEAN, defaultValue: false },
      type: { type: DataTypes.STRING },
    },
    {
      tableName: 'tokens',
    }
  );
  Token.associate = function (models) {
    Token.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };

  return Token;
};
