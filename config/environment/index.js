"use strict";

import path from "path";
import _ from "lodash";

let all = {
	ip: process.env.IP || "0.0.0.0",
	port: process.env.PORT,
	
	auth: {
		id: 12345,
		clientId: "5d89af010cffac590ff1ee30",
		clientSecret: "spritle-client-1234",
		url: "http://localhost:" + process.env.PORT + "/v1/auth/token",
	},
	secrets: {
		accessToken: "spritle-access-token",
		refreshToken: "spritle-refresh-token"
	},
	token: {
		expiresInMinutes: 300
	},
	// MongoDB connection options
	mongo: {
		options: {
			autoReconnect: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}
	}
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
module.exports = _.merge(
	all,
	require("./user-role"),
	require("./development") || {}
);
