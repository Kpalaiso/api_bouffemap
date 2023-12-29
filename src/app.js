const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
const sequelize = require('./config/sequelize');
const db = require('./models/index');
const morgan = require('./config/morgan');
const handleError = require('./utils/HandleError');
const routes = require('./routes/v1');
const { jwtStrategy } = require('./config/passport');

(async () => {
  try {
    await sequelize.authenticate();

    // Sync remaining models
    // await db.User.sync({ alter: true });
    //await db.Ambiance.sync({ alter: true });
    // await db.Role.sync({ alter: true });
    // await db.UserRole.sync({ alter: true });
    // await db.CuisineType.sync({ alter: true });
    // await db.Comodity.sync({ alter: true });
    // await db.Establishment.sync({ alter: true });
    // await db.Guide.sync({ alter: true });
    // await db.Token.sync({ alter: true });

    // await db.OtpValidation.sync({ alter: true });

    // await db.Restaurant.sync({ alter: true });
    // await db.RestaurantAmbiance.sync({ alter: true });
    // await db.RestaurantComodity.sync({ alter: true });
    // await db.RestaurantCuisineType.sync({ alter: true });
    // await db.RestaurantMenu.sync({ alter: true });
    //await db.RestaurantPhoto.sync({ alter: true });
    // await db.UserAmbiancePreference.sync({ alter: true });
    // await db.UserCuisinePreference.sync({ alter: true });
    // await db.UserEstablishmentPreference.sync({ alter: true });
    // await db.UserRestaurantFavoris.sync({ alter: true });
    //await db.UserRestaurantRex.sync({ alter: true });

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const app = express();

app.use((err, req, res, next) => {
  handleError(err, res);
});
app.use(helmet());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api/v1', routes);

module.exports = app;
