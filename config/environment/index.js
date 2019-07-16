"use strict";

import path from "path";
import _ from "lodash";

let all = {
	ip: process.env.IP || "0.0.0.0",
	port: process.env.PORT || 3000,
	// MongoDB connection options
	mongo: {
		options: {
			autoReconnect: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}
	}
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
module.exports = _.merge(
	all,
	require("./user-role"),
	require("./development") || {}
);
