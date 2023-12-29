const jwt = require('jsonwebtoken');
const { tokenTypes } = require('../config/token');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const db = require('../models/index');
const userService = require('./user.service');
const User = db.User;
const Token = db.Token;

/**
 * Generate Token
 * @param {string} userId
 * @param {string} expires
 * @param {string} type
 * @param {string} secret=config.jwt.secret
 * @returns {string}
 */
const generateToken = async (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate Auth Token
 * @param {User} user
 * @returns {Promise<Object>}
 */

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = await generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  Token.create({
    token: refreshToken,
    UserId: user.id,
    expires: refreshTokenExpires,
    type: tokenTypes.REFRESH,
  });
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const tokenDoc = await Token.findOne({
    where: { token: token, type: type, UserId: payload.id_user, blacklisted: false },
    order: [['createdAt', 'DESC']],
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate resetpassword Token
 * @param {string} email
 * @returns {string}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No users found with this email',
      'Aucun utilisateur trouvé avec cet e-mail'
    );
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
  Token.create({
    token: resetPasswordToken,
    UserId: user.id,
    expires: expires,
    type: tokenTypes.RESET_PASSWORD,
  });
  return resetPasswordToken;
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
};
