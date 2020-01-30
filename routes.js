"use strict";
//const i =  require('./api/routers/user');
import user from "./api/routers/user";
export default function(app) {
 // app.use('/v1/auth/token', require('./auth'));
  app.use('/v1/api/users', user);
//  app.use('/v1/api/auth', require('./api/auth'));
 // app.use('/v1/api/posts', require('./api/routers/posts'));
}
