/**
 * Using standard endpoints.
 * GET     /api/posts                       ->  index
 * POST    /api/posts                       ->  create
 * GET     /api/posts/:id                   ->  show
 */

"use strict";

import { references, resourceModel, resources } from "../../config/resource";
import util from 'util';
import _ from 'lodash';
const sendRsp = require("../../utils/response");
const log = require("../../libs/log")(module);
const config = require("../../config/environment");
const { validationResult } = require('express-validator');


export const index = async (req, res) => {
    try {
        req.options = {
            "limit": 20,
            "skip": 0
        }
        if (req.query["limit"] && req.query["offset"]) {
            req.options["limit"] = req.query["limit"];
            req.options["skip"] = req.query["offset"];
        }
        const posts = await resourceModel["posts"].find({}, "", req.options);
        const postsCount = await resourceModel["posts"].estimatedDocumentCount();
        return sendRsp(res, 200, "OK", {
            count: postsCount,
            posts: posts
        })
    } catch (error) {
        log.error("Error:::", error);
        return sendRsp(res, 500, "Server Error", {
            error: error
        });
    }
};

export const create = async (req, res) => {
    try {
        const queryObj = Object.assign({}, req["body"]);
        queryObj["created_by"] = req.user["_id"];
        const posts = await resourceModel["posts"].create(queryObj);
        return sendRsp(res, 201, "Ok", {
            posts: posts
        });
    } catch (error) {
        log.error("Error:::", error);
        return sendRsp(res, 500, "Server Error", {
            error: error
        });
    }
}

export const createLike = async (req, res) => {
    try {
        const posts = await resourceModel["posts"].findById(req.params["id"]);
        if(!posts) {
            return sendRsp(res, 404, "Post not found");
        }
        const likeCheck = await resourceModel["posts"].findOne({
            "_id": posts._id,
            "like_users": req.user._id
        });
        if(!likeCheck) {
            log.info("Need to Create");
            await resourceModel["posts"].updateOne({
				"_id": req.params.id
			}, {
				"$inc": {
					"likes": 1
				},
				"$push": {
					"like_users": req.user._id
				}
            });
            const postsLike = await resourceModel["posts"].findById(req.params["id"]);
            return sendRsp(res, 200, "Like Created", {
                "posts": postsLike
            })
        }
        log.info("Need to Remove");
        await resourceModel["posts"].updateOne({
            "_id": req.params.id
        }, {
            "$inc": {
                "likes": -1
            },
            "$pull": {
                "like_users": req.user._id
            }
        });
        const postsLike = await resourceModel["posts"].findById(req.params["id"]);
        return sendRsp(res, 200, "Like Removed", {
            "posts": postsLike
        })
    } catch (error) {
        log.error("Error:::", error);
        return sendRsp(res, 500, "Server Error", {
            error: error
        });
    }
}

export const createComments = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const createSubComments = async (req, res) => {
    try {

    } catch (error) {

    }
}