const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  // createMovie,
  // getMovieById,
  deleteMovie,
} = require('../controllers/movies');
// const { regexLink } = require('../middlewares/validators');
// const { validateURL } = require('../middlewares/validators');

const savedMoviesRoutes = express.Router();

savedMoviesRoutes.get('/', getMovies);

// moviesRoutes.get('/', getMovieById);

// moviesRoutes.post('/', celebrate({
//   body: Joi.object().keys({
//     country: Joi.string().required(),
//     // country: Joi.string(),
//     director: Joi.string().required(),
//     // director: Joi.string(),
//     duration: Joi.number().required(),
//     // duration: Joi.number(),
//     // year: Joi.string().required(),
//     year: Joi.number().required(),
//     description: Joi.string().required(),
//     // description: Joi.string(),
//     image: Joi.string().required().custom(validateURL),
//     // image: Joi.string(),
//     trailerLink: Joi.string().required().custom(validateURL),
//     // trailerLink: Joi.string().required(),
//     thumbnail: Joi.string().required().custom(validateURL),
//     // thumbnail: Joi.string().custom(validateURL),
//     movieId: Joi.number().required(),
//     // movieId: Joi.number(),
//     nameRU: Joi.string().required(),
//     // nameRU: Joi.string(),
//     nameEN: Joi.string().required(),
//     // nameEN: Joi.string(),

//     // image: Joi.string().required().regex(regexLink),
//     // trailerLink: Joi.string().required().regex(regexLink),
//     // thumbnail: Joi.string().required().regex(regexLink),
//   }),
// }), createMovie);

savedMoviesRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    // movieId: Joi.string().hex().length(24),
    movieId: Joi.string().hex(),
    // movieId: Joi.number(),
  }),
}), deleteMovie);

module.exports = {
  savedMoviesRoutes,
};

// cardsRoutes.post('/', validateCreateCard, createCard);
// cardsRoutes.post('/', celebrate({
//   body: Joi.object().keys()({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().custom(validateURL),
//   }),
// }), createCard);
