const express = require('express');
const mongoose = require('mongoose');

const { PORT = 4001 } = process.env;
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const BadPathError = require('./errors/bad-path-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT = 3000 } = process.env;
const { routes } = require('./routes');
const { errorsProcessing } = require('./middlewares/errors-processing');
const { auth } = require('./middlewares/auth');
// const { regexEmail } = require('./middlewares/validators');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(express.json());

app.use(cors({
  // origin: 'https://mesto-koga-717.nomoredomains.xyz',
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// запускаем мидвару проверки авторизации при различных запросах (routes) к серверу
app.use(auth);
// здесь будет создан путь "/users" и путь "/movies"
app.use(routes);

app.use('/*', (req, res, next) => { next(new BadPathError('Введен некорректный путь')); });

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsProcessing);

async function main() {
  await
  mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  });

  app.listen(PORT);
}

main();
