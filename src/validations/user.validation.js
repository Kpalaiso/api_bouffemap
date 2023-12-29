const Joi = require('joi');

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string(),
      fullName: Joi.string(),
      phoneNumber: Joi.string(),
      device: Joi.string(),
      language: Joi.string(),
    })
    .min(1),
};
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      isActive: Joi.boolean().required(),
    })
    .min(1),
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
