'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    post: {
        type: ObjectId,
        ref: 'Post'
    },
    all_comments: {
        image: String,
        comment: String,
        sub_comments: [{
            comment: String,
            image: String,
            created_by: {
                type: ObjectId,
                ref: 'User'
            }
        }]
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
});

export default mongoose.model("Comment", CommentSchema);
