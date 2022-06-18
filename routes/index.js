const express = require('express');

const routes = express.Router();

const { usersRoutes } = require('./users');

const { moviesRoutes } = require('./movies');

routes.use('/users', usersRoutes);

routes.use('/movies', moviesRoutes);

module.exports = {
  routes,
};
