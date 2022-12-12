"use strict";

const express = require("express");
const userRoute = express.Router();
const basicAuth = require("../middleware/basic");
const bearerAuth = require("../middleware/bearer");
const roleAuth = require("../middleware/acl");

const { favorites } = require('../models/index');
const { users } = require('../models/index');
const { Album } = require('../models/index');




userRoute.post("/signup", async (req, res, next) => {
  try {
    let userData = await users.create(req.body);
    const output = {
      user: userData,
      token: userData.token,
    };
    res.status(201).send(output);
  } catch (e) {
    next(e.message);
  }
});

userRoute.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).send(user);
});

userRoute.put(
  "/users/:id",
  bearerAuth,
  roleAuth("update"),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const userData = await users.findOne({ where: { id } });
      const userObj = req.body;
      let updatedUser = await userData.update(userObj);
      res.status(200).send(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
);

userRoute.get(
  "/users",
  bearerAuth,
  roleAuth("delete"),
  async (req, res, next) => {
    try {
      const userData = await users.findAll({});
      const list = userData.map((user) => user.username);
      res.status(200).json(list);
    } catch (e) {
      console.log(e);
    }
  }
});


userRoute.post('/favorites/:id', bearerAuth, roleAuth('read'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const albumData = req.body;
    const userData = await users.findOne({ where: { id } });
    const albumAdd = await Album.create(albumData);
    const favAlbum = await userData.addAlbum(albumAdd);
    console.log(favAlbum);

    res.status(200).send(favAlbum);
  } catch (e) {
    console.log(e);
  }
});

userRoute.post('/favorites/:id/:albumId', bearerAuth, roleAuth('read'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const albumId = req.params.albumId;
    const userData = await users.findOne({ where: { id } });
    const albumData = await Album.findOne({ where: { id: albumId } });
    const favAlbum = await userData.addAlbum(albumData);
    console.log(favAlbum);

    res.status(200).send(favAlbum);
  } catch (e) {
    console.log(e);
  }
});

userRoute.get('/favorites', bearerAuth, roleAuth('create'), async (req, res, next) => {
  try {
    console.log(favorites);
    const userData = await favorites.findAll({});

    res.status(200).json(userData);
  } catch (e) {
    console.log(e);
  }
});

userRoute.get('/favorites/:id', bearerAuth, roleAuth('read'), async (req, res, next) => {
  try {
    console.log(favorites);
    const id = req.params.id;
    const favData = await favorites.findOne({ where: { UserId: id } });
    res.status(200).json(favData);
  } catch (e) {
    console.log(e);
  }
});



module.exports = userRoute;
