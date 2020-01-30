/**
 * Using standard endpoints.
 * GET     /api/users                       ->  index
 * POST    /api/users                       ->  create
 * GET     /api/users/:id                   ->  show
 */

"use strict";

import { references, resources } from "../../config/resource";
import util from "util";
import _ from "lodash";
const sendRsp = require("../../utils/response");
const resourceModel = require("../../config/resource").resourceModel;
//const log = require("../../libs/log")(module);
//const config = require("../../config/environment");
import config from "../../config/environment";


const { validationResult } = require("express-validator");

export const index = async (req, res) => {
	try {
		const getUsers = await resourceModel["users"]
			.find();
		return sendRsp(res, 200, "OK", {
			users: getUsers
		});
	} catch (error) {
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
		//log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};

export const create = async (req, res) => {
	try {
		console.log("req.body", req.body)
		const errors = validationResult(req);
		console.log("errors", errors);
		if (!errors.isEmpty()) {
			return sendRsp(res, 400, "Missing Body Params!!!", errors);
		}
		const createUser = await resourceModel["users"].create(req.body);
		
		return sendRsp(res, 201, "OK", {
			email: createUser.email
		});
	} catch (error) {
		//log.error("error", error);
		if (error.code === 11000) {
			return sendRsp(res, 406, "User Already Exists!!!");
		}
		return sendRsp(res, 500, "Server Error", {
			error: error.message
		});
	}
};

export const me = async (req, res) => {
	try {
		const user = await resourceModel["users"].findById(
			req.user._id,
			"-tokens -salt -hashed_password"
		);
		console.log("req.cookies", req.cookies);
		return sendRsp(res, 200, "OK", {
			users: user
		});
	} catch (error) {
		//log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error.message
		});
	}
};
