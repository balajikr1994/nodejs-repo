'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
	description: String,
	image: String,
	likes: {
		type: Number,
		default: 0
	},
	like_users: [{
		type: ObjectId,
		ref: 'User'
	}],
	comments: {
		type: Number,
		default: 0
	},
	comment_users: {
		type: ObjectId,
		ref: 'User'
	},
	created_by: {
		type: ObjectId,
		ref: 'User'
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'last_updated_at'
	}
})

export default mongoose.model("Post", PostSchema);
