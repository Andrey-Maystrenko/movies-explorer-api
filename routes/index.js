const express = require('express');

const routes = express.Router();

const { usersRoutes } = require('./users');

const { moviesRoutes } = require('./movies');

const { signingRoutes } = require('./signing');

const { auth } = require('../middlewares/auth');

routes.use('/users', auth, usersRoutes);

routes.use('/movies', auth, moviesRoutes);

routes.use(signingRoutes);

module.exports = {
  routes,
};
