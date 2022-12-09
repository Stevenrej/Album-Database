'use strict';

const favoritesModel = (sequelize, DataTypes) => sequelize.define('Favorites', {
  userId: { type: DataTypes.INTEGER, allowNull: false},
  album: { type: DataTypes.STRING, allowNull: false},
});

module.exports = favoritesModel;
