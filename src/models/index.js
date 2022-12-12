'user strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const albumModel = require('./album');
const favoritesModel = require('./favorites');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

const modelUser = userModel(sequelize, DataTypes);
const modelFavorites = favoritesModel(sequelize, DataTypes);
const modelAlbum = albumModel(sequelize, DataTypes);

modelUser.belongsToMany(modelAlbum, { through: modelFavorites, uniqueKey: 'userUnique' });
modelAlbum.belongsToMany(modelUser, { through: modelFavorites, uniqueKey: 'albumUnique' });

module.exports = {
  db: sequelize,
  users: modelUser,
  Album: modelAlbum,
  favorites: modelFavorites,
};
