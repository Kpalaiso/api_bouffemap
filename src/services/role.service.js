const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../models/index');
const userService = require('./user.service');
const Role = db.Role;
const UserRole = db.UserRole;

/**
 * Description
 * @returns {any}
 */
const getRoles = async () => {
  return Role.findAll();
};

/**
 * Description
 * @param {any} id
 * @returns {any}
 */
const getRoleById = async (id) => {
  return Role.findOne({ where: { id: id } });
};
/**
 * Description
 * @param {any} name
 * @returns {any}
 */
const getRoleByName = async (name) => {
  return Role.findOne({ where: { name: name } });
};
/**
 * Description
 * @param {any} roleBody
 * @returns {any}
 */
const createRole = async (roleBody) => {
  const { name } = roleBody;
  return await Role.create({
    name: name,
  });
};

/**
 * Description
 * @param {any} roleId
 * @param {any} roleBody
 * @returns {any}
 */
const updateRole = async (roleId, roleBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found', 'Role non trouvé');
  }

  Object.assign(role, roleBody);
  return Role.update(role, { where: { id: user.id } });
};

/**
 * Description
 * @param {any} roleUserBody
 * @returns {any}
 */
const AssignRoleToUser = async (roleUserBody) => {
  const { userId, roleName } = roleUserBody;
  const role = await getRoleByName(roleName);
  const user = await userService.getUserById(userId);
  if (!user || !role) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Role Or user not found',
      'Role ou Utilisateur non trouvé'
    );
  }
  return await UserRole.create({
    UserId: userId,
    RoleId: role.dataValues.id,
  });
};

module.exports = {
  getRoles,
  getRoleById,
  getRoleByName,
  createRole,
  updateRole,
  AssignRoleToUser,
};
