/**
 * Using standard endpoints.
 * GET     /api/users                       ->  index
 * POST    /api/users                       ->  create
 * GET     /api/users/:id                   ->  show
 */



"use strict";

import { references } from "../../config/resource";
const sendRsp = require("../../utils/response");
const log = require("../../libs/log")(module);
const resourceModel = require("../../config/resource").resourceModel;

export const index = async (req, res) => {
	try {
		const getAllUserRoles = await resourceModel["user-roles"]
			.find()
			.populate(references["user-roles"]);
		return sendRsp(res, 200, "OK", {
			"user-roles": getAllUserRoles
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
		const getAllUserRole = await resourceModel["user-roles"].findById(
			req.params.id
		);
		return sendRsp(res, 200, "OK", {
			"user-roles": getAllUserRole
		});
	} catch (error) {
		log.error("error", error);
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};