const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
    // validate: (v) => validator.isURL(v),
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v),
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (v) => validator.isURL(v),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

// likes: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//   },
// ],
// cratedAt: {
//   type: Date,
//   default: Date.now,
// },
