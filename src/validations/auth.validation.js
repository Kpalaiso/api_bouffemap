const Joi = require('joi');
const { phoneNumber } = require('./custom.validation');
const register = {
    body: Joi.object().keys({
        fullName: Joi.string().min(2).max(200).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        device: Joi.string().required(),
    }),
};
const verifyTypeEmail = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
};
const verifyTypePhoneNumber = {
    body: Joi.object().keys({
        phoneNumber: Joi.string().required().custom(phoneNumber)
    })
};
const verifyEmailAndPhoneNumber = {
    body: Joi.object().keys({
        identifiant: Joi.string().required(),
        code: Joi.string().required(),
    }),
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
};

module.exports = {
    register,
    verifyTypeEmail,
    verifyTypePhoneNumber,
    verifyEmailAndPhoneNumber,
    login,
    logout,
};