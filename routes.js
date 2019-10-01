"use strict";

export default function(app) {
  app.use('/v1/auth/token', require('./auth'));
  app.use('/v1/api/users', require('./api/routers/user'));
  app.use('/v1/api/auth', require('./api/auth'));
  app.use('/v1/api/posts', require('./api/routers/posts'));
}
