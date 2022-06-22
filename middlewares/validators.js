const regexLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  // validateCreateCard,
  regexLink,
  regexEmail,
};

// const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');

// const validateURL = (value) => {
//   if (!validator.isURL(value, { require_protocol: true })) {
//     throw new Error('Неправильный формат ссылки');
//   }
//   return value;
// };

// const validateCreateCard = () => {
//   celebrate({
//     body: Joi.object().keys()({
//       name: Joi.string().required().min(2).max(30),
//       link: Joi.string().required().custom(validateURL),
//     }),
//   });
// };
