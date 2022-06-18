const Movie = require('../models/Movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    res.status(200).send(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const MovieToDelete = await Movie.findById(req.params.movieId);
    if (!MovieToDelete) {
      next(new NotFoundError('Карточки с таким id не найдено'));
      return;
    }
    if (req.user._id !== MovieToDelete.owner.toString()) {
      next(new ForbiddenError('Нельзя удалять чужие карточки'));
      return;
    }
    const deletedMovie = await Movie.findByIdAndRemove(req.params.movieId);
    res.status(200).send(deletedMovie);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Некорректный формат id'));
    } else { next(err); }
  }
};

const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      movieId: req.body.movieId,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
      owner: req.user._id,
    });
    res.status(201).send(await newMovie.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else { next(err); }
  }
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
  // likeCard,
  // dislikeCard,
};

// const deletedCard = await Card.deleteOne({ _id: req.params.cardId });

// const likeCard = async (req, res, next) => {
//   try {
//     const likedCard = await Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//       { new: true },
//     );
//     if (!likedCard) {
//       next(new NotFoundError('Карточки с таким id не найдено'));
//       return;
//     }
//     res.status(200).send(likedCard);
//   } catch (err) {
//     if (err.kind === 'ObjectId') {
//       next(new BadRequestError('Некорректный формат id карточки'));
//     } else { next(err); }
//   }
// };

// const dislikeCard = async (req, res, next) => {
//   try {
//     const dislikedCard = await Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $pull: { likes: req.user._id } }, // убрать _id из массива
//       { new: true },
//     );
//     if (!dislikedCard) {
//       next(new NotFoundError('Карточки с таким id не найдено'));
//       return;
//     }
//     res.status(200).send(dislikedCard);
//   } catch (err) {
//     if (err.kind === 'ObjectId') {
//       next(new BadRequestError('Некорректный формат id карточки'));
//     } else { next(err); }
//   }
// };
