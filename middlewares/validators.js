// const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { messages } = require('../errors/messages');

const regexLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const validateURL = (value, next) => {
const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error(messages.incorrectData);
  }
  return value;
};

// const validateLink = () => {
//   celebrate({
//     body: Joi.object().keys()({
//       name: Joi.string().required().min(2).max(30),
//       link: Joi.string().required().custom(validateURL),
//     }),
//   });
// };

module.exports = {
  regexLink,
  regexEmail,
  validateURL,
};
