"use strict";

import path from "path";
import _ from "lodash";

let all = {
	ip: process.env.IP,
	port: process.env.PORT,
	tmp: process.env.TMP,
	auth: {
		id: process.env.PROJECT_ID,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		url: "http://localhost:" + process.env.PORT + "/v1/auth/token",
	},
	secrets: {
		accessToken: process.env.accessTokenSecret,
		refreshToken: process.env.refreshTokenSecret
	},
	s3FileUpload: {
		expiresInMinutes: 60 * 15,
		keyId: process.env.S3_KEY_ID,
		secret: process.env.S3_SECRET,
		bucket: process.env.S3_BUCKET,
		region: process.env.S3_REGION
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
	require("./development") || {}
);
