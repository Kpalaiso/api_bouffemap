module.exports = (sequelize, DataTypes) => {
  const OtpValidation = sequelize.define(
    'OtpValidation',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: { type: DataTypes.STRING }, //enum(Mail ou phoneCode)
      identifiant: { type: DataTypes.STRING },
      code: { type: DataTypes.STRING },
      expires: { type: DataTypes.DATE },
    },
    {
      tableName: 'otp-validation',
    }
  );

  return OtpValidation;
};
