'use strict';

const albumModel = (sequelize, DataTypes) => sequelize.define('Album', {
  artist: { type: DataTypes.STRING, required: true, allowNull: false},
  title: { type: DataTypes.STRING, required: true, allowNull: false},
  tracks: { type: DataTypes.INTEGER, required: false},
  year: { type: DataTypes.INTEGER, required: false},
});

module.exports = albumModel;
