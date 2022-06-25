const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  updateUserInfo,
  userProfile,
} = require('../controllers/users');

// const { regexEmail } = require('../middlewares/validators');

const usersRoutes = express.Router();

usersRoutes.get('/me', userProfile);

usersRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = {
  usersRoutes,
};

// usersRoutes.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().regex(regexLink),
//   }),
// }), updateAvatar);
