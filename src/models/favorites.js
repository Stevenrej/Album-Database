'use strict';

const favoritesModel = (sequelize, DataTypes) => sequelize.define('Favorites', {
  userId: { type: DataTypes.INTEGER, allowNull: false},
});

module.exports = favoritesModel;
