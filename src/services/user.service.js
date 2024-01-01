const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const User = db.User;

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findOne({ where: { id: id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email: email } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByPhoneNumber = async (phoneNumber) => {
  return User.findOne({ where: { phoneNumber: phoneNumber } });
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const { fullName, email, password, device } = userBody;
  const passwordCrypt = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
  if (await User.prototype.isEmailTaken(email)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Email already taken',
      "L'adresse e-mail est déjà utilisé"
    );
  }
  if (await User.prototype.isPhoneNumberTaken(phoneNumber)) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Phone number already taken',
      'Le numéro de téléphone est déjà utilisé'
    );
  }

  return await User.create({
    fullName,
    email,
    password: passwordCrypt,
    phoneNumber,
    device,
    localisation,
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found', 'Utilisateur non trouvé');
  }
  // if (updateBody.email != user.D && (await User.isEmailTaken(updateBody.email, userId))) {
  //     const userByMail = await getUserByEmail(updateBody.email);
  //     if (userByMail) {
  //         throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  //     }else{

  //     }
  // }
  Object.assign(user, updateBody);
  return User.update(user, { where: { id: user.id } });
};

/**
 * Description
 * @returns {Promise<User>}
 */
const getUsers = async () => {
  return User.findAll();
};

/**
 * Récupère le nombre total d'utilisateurs.
 * @returns {Promise<number>} - Le nombre total d'utilisateurs.
 */
const getTotalUserCount = async () => {
  const count = await User.count();
  return count;
};

/**
 * Récupère le nombre total d'utilisateurs enregistrés par mois sur les 6 derniers mois.
 * @returns {Promise<object>} - Un objet contenant le nombre d'utilisateurs enregistrés par mois.
 */
const getUserCountByMonth = async () => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const countByMonth = await User.findAll({
    attributes: [
      [db.sequelize.fn('date_trunc', 'month', db.sequelize.col('createdAt')), 'month'],
      [db.sequelize.fn('count', '*'), 'count'],
    ],
    where: {
      createdAt: {
        [db.Sequelize.Op.between]: [sixMonthsAgo, currentDate],
      },
    },
    group: ['month'],
    raw: true,
  });

  return countByMonth;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByPhoneNumber,
  getUserById,
  updateUserById,
  getUsers,
  getTotalUserCount,
  getUserCountByMonth,
};
