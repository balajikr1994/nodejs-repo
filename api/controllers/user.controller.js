/**
 * Using standard endpoints.
 * GET     /api/users                       ->  index
 * POST    /api/users                       ->  create
 * GET     /api/users/:id                   ->  show
 */

"use strict";

import { references } from "../../config/resource";
import util from 'util';
const sendRsp = require("../../utils/response");
const resourceModel = require("../../config/resource").resourceModel;
const log = require("../../libs/log")(module);
const config = require("../../config/environment");
const { validationResult } = require('express-validator');


export const index = async (req, res) => {
	try {
		const getUsers = await resourceModel["users"]
			.find()
			.populate(references["users"]);
		return sendRsp(res, 200, "OK", {
			users: getUsers
		});
	} catch (error) {
		log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};

export const show = async (req, res) => {
	try {
		const getUser = await resourceModel["users"].findById(req.params.id);
		return sendRsp(res, 200, "OK", {
			users: getUser
		});
	} catch (error) {
		log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};

export const create = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return sendRsp(res, 400, 'Missing Body Params', errors);
		}
		const createUser = await resourceModel["users"].create(req.body);
		const count = await resourceModel["users"].estimatedDocumentCount();
		let userRoleObj = {};
		userRoleObj["user"] = createUser._id;
		if (count == 1) {
			userRoleObj["role"] = config.role[1];
			await resourceModel["user-roles"].create(userRoleObj);
		} else {
			userRoleObj["role"] = config.role[2];
			await resourceModel["user-roles"].create(userRoleObj);
		}
		return sendRsp(res, 201, "OK", {
			users: createUser
		});
	} catch (error) {
		log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error.message
		});
	}
};
