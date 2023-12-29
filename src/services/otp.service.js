const httpStatus = require('http-status');
const moment = require('moment');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const generateCode = require('../utils/generateCode');
const db = require('../models/index');
const OTP = db.OtpValidation;

/**
 * Create OTP
 * @param {String} identifiant
 * @param {String} type
 * @returns {Promise<OTP>}
 */
const createOTP = async (identifiant, type) => {
  let expires = null;
  if (type == 'email') {
    if (await User.prototype.isEmailTaken(email)) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Email already taken',
        "L'adresse e-mail est déjà utilisé"
      );
    }
    expires = moment().add(config.jwt.verifyEmailExpirationDays, 'days');
  } else {
    if (await User.prototype.isPhoneNumberTaken(email)) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Phone number already taken',
        'Le numéro de téléphone est déjà utilisé'
      );
    }
    expires = moment().add(config.jwt.verifyPhoneNumberExpirationMinutes, 'minutes');
  }

  return await OTP.create({
    type: type,
    identifiant: identifiant,
    code: generateCode(),
    expires: expires.toDate(),
  });
};

/**
 * Get OTP last OTP
 * @param {String} identifiant
 * @param {String} code
 * @returns {Promise<OTP>}
 */
const getOtpValidationByIdentiantAndCode = async (identifiant, code) => {
  const otp = await OTP.findOne({
    where: { identifiant: identifiant },
    order: [['createdAt', 'DESC']],
  });

  if (!otp || otp.dataValues.code != code) {
    throw new ApiError(httpStatus.NOT_FOUND, 'OTP code is invalid', "Le code OTP n'est pas valide");
  }
  if (otp.dataValues.expires < new Date()) {
    throw new ApiError(httpStatus.REQUEST_TIMEOUT, 'OTP code has expired', 'Le code OTP a expiré');
  }
  return otp;
};
module.exports = {
  createOTP,
  getOtpValidationByIdentiantAndCode,
};
