"use strict";

import express from "express";
import bodyParser from "body-parser";
var cookieParser = require('cookie-parser');


//Express middleware configuration
export default function (app) {
	app.use(
		bodyParser.urlencoded({
			extended: false
		})
	);
	app.use(cookieParser());
	app.use(express.json());
	app.use(bodyParser.json());

	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, DELETE, PUT, OPTIONS"
		);
		res.set(
			"Access-Control-Allow-Headers",
			req.header("Access-Control-Request-Headers")
		);
		res.set("Access-Control-Allow-Credentials", "true");
		next();
	});

}