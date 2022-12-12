'use strict';

const express = require('express');
const albumRoute = express.Router();
// const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const roleAuth = require('../middleware/acl');

const { Album } = require('../models/index');




albumRoute.get('/album', bearerAuth, roleAuth('read'), async (req, res, next) => {
  try {
    const albumData = await Album.findAll({});
    const list = albumData.map(album => {
      let newObj = {
        title: album.title,
        artist: album.artist,
        tracks: album.tracks,
        year: album.year,
        id: album.id,
      };
      return newObj;
    });
    res.status(200).send(list);
  } catch (e) {
    console.error(e);
  }
});


albumRoute.get('/album/:id', bearerAuth, roleAuth('read'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const albumData = await Album.findOne({ where: { id } });
    const output = {
      album: albumData.title,
      artist: albumData.artist,
      tracks: albumData.tracks,
      year: albumData.year,
      id: albumData.id,
    };
    res.status(200).send(output);
  } catch (e) {
    console.error(e);
  }
});





albumRoute.post('/album', bearerAuth, roleAuth('create'), async (req, res, next) => {
  try {
    let albumData = await Album.create(req.body);
    const output = {
      album: albumData.title,
      artist: albumData.artist,
      tracks: albumData.tracks,
      year: albumData.year,
      id: albumData.id,
    };
    res.status(201).send(output);
  } catch (e) {
    next(e.message);
  }
});

albumRoute.put('/album/:id', bearerAuth, roleAuth('update'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const albumData = await Album.findOne({ where: { id } });
    const albumObj = req.body;
    let updatedAlbum = await albumData.update(albumObj);
    res.status(200).send(updatedAlbum);
  } catch (e) {
    console.log(e);
  }
});


albumRoute.delete('/album/:id', bearerAuth, roleAuth('delete'), async (req, res, next) => {
  try {
    let id = req.params.id;
    const albumId = await Album.findOne({ where: { id } });
    let deletedAlbum = await albumId.destroy();
    res.status(200).send(deletedAlbum);
  } catch (e) {
    console.log(e);
  }
});


module.exports = albumRoute;




