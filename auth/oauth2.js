'use strict';

import oauth2orize from 'oauth2orize';
import passport from 'passport';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { resourceModel } from '../config/resource';
const  config  = require('../config/environment');
const log = require("../libs/log")(module);
const auth = require('./auth');
const server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(async (client, username, password, scope, done) => {
	const user = await resourceModel["users"].findOne({
		"email": username
	})
	
	if (!user.authenticate(password)) {
		return done(null, false);
	}

	const tokenPayLoad = {
		"userId": user["_id"],
		"email": user["email"],
		"client": client
	}
	
	const accessToken = jwt.sign(tokenPayLoad, config.secrets["accessToken"], {
		expiresIn: config.token["expiresInMinutes"] * 60
	});

	if (user["tokens"].length > 0) {
		for (var i = 0; i < user.tokens.length; i++) {
			let token = user.tokens[i];
			if (token.clientId == client.id) {
				return done(null, accessToken, token.refreshToken, {
					expires_in: config.token.expiresInMinutes * 60
				});
			}
		}
	}

	const refreshTokenPayload = {
		"userId": user["_id"],
		"email": user["email"],
		"client": client
	}
	const refreshToken = jwt.sign(refreshTokenPayload, config.secrets["refreshToken"])

	const userUpdate = await resourceModel["users"].updateOne({
		"_id": user["_id"],
		"tokens.clientId": client["id"]
	}, {
		$set: {
			"tokens.$": {
				"clientId": client["id"],
				"refreshToken": refreshToken
			}
		}
	});
	const token = {
		clientId: client.id,
		refreshToken: refreshToken
	};
	
	if (userUpdate.nModified == 0) {
		await resourceModel["users"].updateOne({
			"_id": user["_id"]
		}, {
			"$push": {
				"tokens": token
			}
		});
		
		return done(null, accessToken, refreshToken, {
			"expires_in": config.token["expiresInMinutes"] * 60
		});
	}
	return done(null, accessToken, refreshToken, {
		"expires_in": config.token["expiresInMinutes"] * 60
	});
}));

exports.token = [
	passport.authenticate(['basic', 'oauth2-client-password'], {
		session: false
	}), server.token(), server.errorHandler()
];