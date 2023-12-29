const config = require('./config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.mysql.db_name, config.mysql.db_user, config.mysql.db_pass, {
    host: config.mysql.host,
    dialect: config.mysql.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
    },
});

module.exports = sequelize;