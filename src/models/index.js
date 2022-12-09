'user strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const albumModel = require('./album');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  album: albumModel(sequelize, DataTypes),
};
