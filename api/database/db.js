const { Sequelize } = require('sequelize');
const Logger = require('../helpers/Logger.helper');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: msg => Logger.sql(msg)
});