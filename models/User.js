const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: { validator: (v) => validator.isEmail(v) },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    // default: 'Жак-Ив Кусто',
  },
});

module.exports = mongoose.model('user', userSchema);

// about: {
//   type: String,
//   minlength: 2,
//   maxlength: 30,
//   default: 'Исследователь',
// },
// avatar: {
//   type: String,
//   default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
//   validate: (v) => validator.isURL(v),
// },
