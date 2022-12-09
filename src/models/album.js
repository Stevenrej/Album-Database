'use strict';

const albumModel = (sequelize, DataTypes) => sequelize.define('Album', {
  artist: { type: DataTypes.STRING, required: true},
  title: { type: DataTypes.STRING, required: true},
  tracks: { type: DataTypes.INTEGER, required: false},
  year: { type: DataTypes.INTEGER, required: false},
});

module.exports = albumModel;
