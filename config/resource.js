"use strict";

import userModel from "../api/models/user.model";
import postModel from "../api/models/posts.model";
import commentsModel from "../api/models/comments.model";

//MODELS CONFIGURATION
export const resourceModel = {
	users: userModel,
	posts: postModel,
	comments: commentsModel
};

//NAMING CONVENTIONS
export const resources = {
	users: "users",
	posts: "posts",
	comments: "comments"
};

//CONFIGURATION ALL POPULATE COLLECTIONS
export const references = {
	
};
