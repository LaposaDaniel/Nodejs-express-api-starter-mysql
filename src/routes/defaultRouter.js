const authorize = require('../service/auth');

var routerDefined = function (app) {
  app.use('/', require('./index'));
  app.use('/users', authorize, require('./usersRouter'));
}

module.exports = routerDefined;