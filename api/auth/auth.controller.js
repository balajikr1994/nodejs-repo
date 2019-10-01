'use strict';

import config from '../../config/environment';
import request from 'request';
const log = require("../../libs/log")(module);
const sendRsp = require("../../utils/response");
const cryptography = require('../../auth/encrypt-decrypt');
import { resourceModel } from '../../config/resource';

export const login = async (req, res) => {
	try {
		const params = {};
		params["username"] = req.body["username"];
		params["password"] = req.body["password"];
		params["grant_type"] = "password";
		const clientId = config.auth["clientId"];
		const clientSecret = config.auth["clientSecret"];
		const authCode = new Buffer.from(clientId + ":" + clientSecret).toString('base64');
	   
		request.post({
			"url": config.auth["url"],
			"form": params,
			"headers": {
				"Authorization": "Basic " + authCode
			}
		}, async (err, response, body) => {
			if (response.statusCode != 200) {
				sendRsp(res, 401, 'Invalid email or Password');
				return;
			}
			const username = req.body["username"];
			const rspTokens = {};
			const tokenJSON = JSON.parse(body);
			const refreshToken = tokenJSON["refresh_token"];
			rspTokens["access_token"] = tokenJSON["access_token"];
			rspTokens["expires_in"] = tokenJSON["expires_in"];
			rspTokens["token_type"] = tokenJSON["token_type"];
			rspTokens["refresh_token"] = tokenJSON["refresh_token"];
			const encryptedRefToken = cryptography.encrypt(refreshToken);
			
			try {
				const user = await resourceModel["users"].findOne({
					"email": username
				});
				if (user) {
					res.cookie("spritle_refresh_token", encryptedRefToken);
					return sendRsp(res, 200, "Success", rspTokens);
				}
			} catch (error) {
				return sendRsp(res, 500, "Server error");
			}

		})
	} catch (error) {
		log.error("error", error);
		return sendRsp(res, 500, "Server error", {
			"error": error.message
		})
	}
}