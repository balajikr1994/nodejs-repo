"use strict";

require('dotenv').config();
import path from "path";
import _ from "lodash";


let all = {
	ip: process.env.IP || "0.0.0.0",
	port: process.env.PORT ,
	tmp: process.env.TMP || "/tmp",
	auth: {
		id: process.env.PROJECT_ID || 1,
		clientId: process.env.CLIENT_ID || "32342342343",
		clientSecret: process.env.CLIENT_SECRET || "sdfsdfsdfsdfsfsdfsdfsdfsfsfsfsfs",
		url: "http://localhost:" + process.env.PORT + "/v1/auth/token",
	},
	secrets: {
		accessToken: process.env.accessTokenSecret || "my_access_token",
		refreshToken: process.env.refreshTokenSecret || "my_refresh_token"
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
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		}
	}
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
const mergeObj = _.merge(
	all,
	require("./development")
);

export default mergeObj;
