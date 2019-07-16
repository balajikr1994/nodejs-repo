"use strict";

import userModel from "../api/models/user.model";
import userRoleModel from "../api/models/user-role.model";

//MODELS CONFIGURATION
export const resourceModel = {
	users: userModel,
	"user-roles": userRoleModel
};

//NAMING CONVENTIONS
export const resources = {
	users: "users",
	"user-roles": "user-roles"
};

//CONFIGURATION ALL POPULATE COLLECTIONS
export const references = {
	"user-roles": {
		path: "user",
		select: "first_name last_name email status"
	}
};
