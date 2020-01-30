"use strict";
//const i =  require('./api/routers/user');
import user from "./api/routers/user";
import auth from "./auth";
import post from "./api/routers/posts";
import authAPI from "./api/auth";

export default function(app) {
	app.use("/v1/auth/token", auth);
	app.use("/v1/api/users", user);
	app.use("/v1/api/auth", authAPI);
	app.use("/v1/api/posts", post);
}
