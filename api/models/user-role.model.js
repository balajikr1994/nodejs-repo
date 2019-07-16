"use strict";

import mongoose from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;
const Schema = mongoose.Schema;

const userRoleSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: "User"
		},
		role: {
			type: String,
			enum: ["ADMIN", "VENDOR"]
		}
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "last_updated_at"
		}
	}
);

export default mongoose.model("userRole", userRoleSchema);
