const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  login,
  createUser,
} = require('../controllers/users');

const signingRoutes = express.Router();

signingRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

signingRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = {
  signingRoutes,
};
