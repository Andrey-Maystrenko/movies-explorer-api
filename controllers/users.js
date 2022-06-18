const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middlewares/auth');
const User = require('../models/User');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const DUBLICATE_MONGOOSE_ERROR_CODE = 11000;

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  if (!email || !password) {
    next(new BadRequestError('Неправильные логин или пароль'));
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      email,
      password: hash,
      name,
    });
    const { password: removedPassword, ...user } = newUser.toObject();
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены ошибочные данные'));
    }
    if (err.code === DUBLICATE_MONGOOSE_ERROR_CODE) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else { next(err); }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError('Неправильные логин или пароль'));
      return;
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      next(new UnauthorizedError('Неправильные логин или пароль'));
      return;
    }
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError('Пользователя с таким id не найдено'));
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Недопустимый формат id'));
    } else { next(err); }
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!req.body.email || !req.body.name) {
      next(new BadRequestError('Введены ошибочные данные'));
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены ошибочные данные'));
    } else { next(err); }
  }
};

module.exports = {
  createUser,
  login,
  updateUserInfo,
  userProfile,
};
// const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.status(200).send(users);
//   } catch (err) {
//     next(err);
//   }
// };

// const getUserByID = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       next(new NotFoundError('Нет пользователя с таким id'));
//       return;
//     } res.status(200).send(user);
//   } catch (err) {
//     if (err.kind === 'ObjectId') {
//       next(new BadRequestError('Недопустимый формат id'));
//     } else { next(err); }
//   }
// };

// const updateAvatar = async (req, res, next) => {
//   try {
//     const { avatar } = req.body;
//     if (!req.body.avatar) {
//       next(new BadRequestError('Введены ошибочные данные'));
//       return;
//     }
//     const updatedAvatar = await User.findByIdAndUpdate(
//       req.user._id,
//       { avatar },
//       { new: true, runValidators: true },
//     );
//     res.status(200).send({ data: updatedAvatar });
//   } catch (err) {
//     if (err.name === 'ValidationError') {
//       next(new BadRequestError('Введены ошибочные данные'));
//     } else { next(err); }
//   }
// };
