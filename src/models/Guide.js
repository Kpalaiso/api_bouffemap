module.exports = (sequelize, DataTypes) => {
  const Guide = sequelize.define(
    'Guide',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING },
      url_guide: { type: DataTypes.STRING },
      url_img: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'guides',
    }
  );

  return Guide;
};
