// мидлвара проверки авторизации перед запросами
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { messages } = require('../errors/messages');

// const { JWT_SECRET = 'some-secret-key' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('./config');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError(messages.wrongLoginOrPassword));
    return;
  }
  // const token = authorization;
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // payload = await jwt.verify(token, JWT_SECRET);
    payload = await jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorizedError(messages.wrongLoginOrPassword));
    return;
  }
  req.user = payload;
  next();
};

// module.exports = { auth, JWT_SECRET };
module.exports = { auth };

// const jwt = require('jsonwebtoken');

// const UnauthorizedError = require('../errors/unauthorized-error');

// const { JWT_SECRET = 'some-secret-key' } = process.env;

// module.exports = async (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     next(new UnauthorizedError('Нет доступа'));
//     return;
//   }
//   const token = authorization;
//   let payload;
//   try {
//     payload = await jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     next(new UnauthorizedError('Нет доступа'));
//     return;
//   }
//   req.user = payload;
//   next();
// };

// module.exports = { JWT_SECRET };

// const req = require('express/lib/request');
// const jwt = require('jsonwebtoken');
// // const JWT_SECRET = 'some-secret-key';
// const { JWT_SECRET = 'some-secret-key' } = process.env;

// const isAuthorized = async (token) => {
//   try {
//     const payload = await jwt.verify(token, JWT_SECRET);
//     req.user = payload;
//     return !!payload;
//   } catch (err) {
//     return false;
//   }
// };

// module.exports = {
//   isAuthorized,
//   JWT_SECRET,
// };
