const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT = 4001 } = process.env;
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const BadPathError = require('./errors/bad-path-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { routes } = require('./routes');
const { errorsProcessing } = require('./middlewares/errors-processing');
const { limiter } = require('./middlewares/rate-limiter');

const { NODE_ENV, DB_PATH } = process.env;
const { DB_PATH_DEV } = require('./middlewares/config');

const app = express();

app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(express.json());

app.use(cors({
  // origin: 'https://diploma-koga-717.nomoredomains.xyz ',
  origin: 'http://localhost:3001',
  credentials: true,
}));

// здесь будет создан путь "/users" и путь "/movies" и путь "/signin" и "/signup"
app.use(routes);

app.use('/*', (req, res, next) => { next(new BadPathError('Введен некорректный путь')); });

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsProcessing);

async function main() {
  await
  // mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  mongoose.connect(NODE_ENV === 'production' ? DB_PATH : DB_PATH_DEV, {
  });

  app.listen(PORT);
}

main();

// const { celebrate, Joi } = require('celebrate');

// const { login, createUser } = require('./controllers/users');

// const { auth } = require('./middlewares/auth');

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(2).max(30),
//   }),
// }), login);

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(2).max(30),
//     name: Joi.string().required().min(2).max(30),
//   }),
// }), createUser);

// // запускаем мидвару проверки авторизации при различных запросах (routes) к серверу
// app.use(auth);
