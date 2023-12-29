const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const handleError = require('../utils/HandleError');
const { userService } = require('../services');
const verifyCallback = (req, resolve, reject, role) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(
      new ApiError(
        httpStatus.UNAUTHORIZED,
        'Please authenticate',
        "Authentifiez vous s'il vous plait"
      )
    );
  }
  req.user = user;

  if (role != undefined) {
    const userById = await userService.getUserById(user.sub);
    if (!userById.dataValues.isAdmin) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden', 'Forbidden'));
    }
  }

  resolve();
};

const auth = (role) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, role))(
      req,
      res,
      next
    );
  })
    .then(() => next())
    .catch((err) => {
      return handleError(err, res);
    });
};

module.exports = auth;
