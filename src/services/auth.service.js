const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const userService = require('./user.service');
const tokenService = require('./token.service');
const { tokenTypes } = require('../config/token');
const ApiError = require('../utils/ApiError');

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @param {string} typeAuth
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password, typeAuth) => {
  const user = await userService.getUserByEmail(email);
  if (
    !user ||
    !(await bcrypt.compare(password, user.dataValues.password)) ||
    user.dataValues.typeAuth != typeAuth
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Incorrect email or password',
      'Email ou mot de passe incorrect'
    );
  }
  return user;
};
/**
 * Login with email and typeAuth
 * @param {string} email
 * @param {string} typeAuth
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndTypeAuth = async (email, typeAuth) => {
  const user = await userService.getUserByEmail(email);
  if (!user || user.dataValues.typeAuth != typeAuth) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Incorrect email or password',
      'Email ou mot de passe incorrect'
    );
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found', 'Ressource innexistante');
  }
  return await Token.update(
    { blacklisted: true },
    { where: { id: refreshTokenDoc.dataValues.id } }
  );
};
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.dataValues.UserId);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Password reset failed',
      'la réinitialisation du mot de passe à echoué'
    );
  }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    console.log(refreshToken);
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    console.log(refreshTokenDoc.dataValues);
    const user = await userService.getUserById(refreshTokenDoc.dataValues.UserId);

    if (!user) {
      throw new Error();
    }
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Please authenticate',
      "Authentifiez vous s'il vous plait"
    );
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithEmailAndTypeAuth,
  logout,
  resetPassword,
  refreshAuth,
};
