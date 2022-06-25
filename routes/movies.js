const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
// const { regexLink } = require('../middlewares/validators');
const { validateURL } = require('../middlewares/validators');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    // image: Joi.string().required().regex(regexLink),
    // trailerLink: Joi.string().required().regex(regexLink),
    // thumbnail: Joi.string().required().regex(regexLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

moviesRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = {
  moviesRoutes,
};

// cardsRoutes.post('/', validateCreateCard, createCard);
// cardsRoutes.post('/', celebrate({
//   body: Joi.object().keys()({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().custom(validateURL),
//   }),
// }), createCard);
