const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService,
  otpService,
  roleService,
} = require('../services');
const handleError = require('../utils/HandleError');
const config = require('../config/config');

const register = catchAsync(async (req, res, next) => {
  try {
    if (req.body.password == null || req.body.password == '') {
      req.body.password = '12345';
    }
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    const roleUserBody = {
      userId: user.dataValues.id,
      roleName: 'ROLE_USER',
    };
    await emailService.sendCongratulationEmail(req.body.email);
    await roleService.AssignRoleToUser(roleUserBody);
    res.status(httpStatus.CREATED).send({ status: config.statusRequestSucces, user, tokens });
  } catch (err) {
    return handleError(err, res);
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password, typeAuth } = req.body;
    let user;
    if (typeAuth == 'authEmail') {
      user = await authService.loginUserWithEmailAndPassword(email, password, typeAuth);
    } else {
      user = await authService.loginUserWithEmailAndTypeAuth(email, typeAuth);
    }
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({ status: config.statusRequestSucces, user, tokens });
  } catch (err) {
    return handleError(err, res);
  }
});

const logout = catchAsync(async (req, res) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (err) {
    return handleError(err, res);
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ status: config.statusRequestSucces, ...tokens });
  } catch (err) {
    return handleError(err, res);
  }
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  try {
    const otp = await otpService.createOTP(req.body.email, 'email');
    await emailService.sendVerificationEmail(req.body.email, otp.dataValues.code);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (err) {
    return handleError(err, res);
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  try {
    await otpService.getOtpValidationByIdentiantAndCode(req.body.identifiant, req.body.code);
    res
      .status(httpStatus.OK)
      .send({ status: config.statusRequestSucces, message: 'Verification éffectué avec succèss' });
  } catch (err) {
    return handleError(err, res);
  }
});

const sendVerificationPhoneNumber = catchAsync(async (req, res) => {
  try {
    const otp = await otpService.createOTP(req.body.phoneNumber, 'phoneNumber');
    //await emailService.sendVerificationEmail(req.body.phoneNumber, otp);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (err) {
    return handleError(err, res);
  }
});

const verifyPhoneNumber = catchAsync(async (req, res) => {
  try {
    await otpService.getOtpValidationByIdentiantAndCode(req.body.identifiant, req.body.code);
    res
      .status(httpStatus.OK)
      .send({ status: config.statusRequestSucces, message: 'Verification éffectué avec succèss' });
  } catch (err) {
    return handleError(err, res);
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (err) {
    return handleError(err, res);
  }
});
const resetPassword = catchAsync(async (req, res) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send({ status: config.statusRequestSucces });
  } catch (err) {
    return handleError(err, res);
  }
});

module.exports = {
  register,
  sendVerificationEmail,
  verifyEmail,
  sendVerificationPhoneNumber,
  verifyPhoneNumber,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshTokens,
};
