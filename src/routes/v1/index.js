const express = require('express');
const docsRoute = require('./docs.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const settingRoute = require('./settings.route');
const guideRoute = require('./guide.route');
const favorisRoute = require('./favoris.route');
const statRoute = require('./stat.route');
const rexRoute = require('./rex.route');
const restaurantRoute = require('./restaurant.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/settings',
    route: settingRoute,
  },
  {
    path: '/favoris',
    route: favorisRoute,
  },
  {
    path: '/guides',
    route: guideRoute,
  },

  {
    path: '/stats',
    route: statRoute,
  },
  {
    path: '/restaurants',
    route: restaurantRoute,
  },
  {
    path: '/rex',
    route: rexRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
