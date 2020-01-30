"use strict";
require("dotenv").config();
const path = require('path')
import express from "express";
import http from "http";
import expressConfig from "./config/express";
import routerConfig from "./routes";
import mongoose from "mongoose";
import config from "./config/environment";
import passport from "passport";
const app = express(),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, "index.html");
const server = http.createServer(app);
const multipart = require("connect-multiparty");

app.get("/", (req, res) => {
	res.sendFile(HTML_FILE);
});

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on("error", err => {
	//log.error("MongoDB Connection Error" + err);
	process.exit(-1);
});

app.use(
	multipart({
		uploadDir: config.tmp
	})
);
app.use(passport.initialize());
app.use(passport.session());

expressConfig(app);
routerConfig(app);

function startServer() {
	app.server = server.listen(process.env.PORT, config.ip, () => {
		console.log("Express server listening on ", server.address().port);
	});
}

setImmediate(startServer);
