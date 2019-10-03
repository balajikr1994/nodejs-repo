/**
 * Using standard endpoints.
 * GET     /api/posts                       ->  index
 * POST    /api/posts                       ->  create
 * GET     /api/posts/:id                   ->  show
 */

"use strict";

import { resourceModel } from "../../config/resource";
import _ from 'lodash';
import fs from 'fs';
const sendRsp = require("../../utils/response");
const log = require("../../libs/log")(module);
const config = require("../../config/environment");
const s3upload = require('../../utils/s3');

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
        if (!posts) {
            return sendRsp(res, 404, "Post not found");
        }
        const likeCheck = await resourceModel["posts"].findOne({
            "_id": posts._id,
            "like_users": req.user._id
        });
        if (!likeCheck) {
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
        const post = await resourceModel["posts"].findById(req.params["id"]);
        if (!post) {
            return sendRsp(res, 404, "Post not found");
        }
        await s3FileUpload(req, res);
        const commentUpdate = await resourceModel["posts"].updateOne({
            "_id": post._id
        }, {

            "$inc": {
                "comments": 1
            },
            "$push": {
                "comment_users": req.user["_id"]
            }
        });

        if (commentUpdate.nModified == 1) {
            const createComments = await resourceModel["comments"].create({
                post: post._id,
                all_comments: {
                    image: req.body["image"],
                    comment: req.body["comment"],
                    created_by: req.user["_id"]
                }
            });
            const getPost = await resourceModel["posts"].findById(req.params["id"]);
            return sendRsp(res, 200, "OK", {
                "posts": getPost,
                "comments": createComments
            })
        }
        return sendRsp(res, 405, "Conflicts");
    } catch (error) {
        log.info("Error:::", error);
        return sendRsp(res, 500, "Server Error");
    }
}

export const createSubComments = async (req, res) => {
    try {
        const post = await resourceModel["posts"].findById(req.params["id"]);
        if (!post) {
            return sendRsp(res, 404, "Post not found");
        }
        const comment = await resourceModel["comments"].findById(req.params["comment"]);
        if (!comment) {
            return sendRsp(res, 404, "Post not found");
        }
        await s3FileUpload(req, res);
        comment.all_comments.sub_comments.push({
            image: req.body["image"],
            comment: req.body["comment"],
            created_by: req.user["_id"]
        })
        await comment.save();

        const updatedComments = await resourceModel["comments"].findById(req.params["comment"]);
        return sendRsp(res, 200, "OK", {
            "posts": post,
            "comments": updatedComments
        });

    } catch (error) {
        log.info("Error:::", error);
        return sendRsp(res, 500, "Server Error");
    }
}


const s3FileUpload = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.files && req.files.file) {
            let file = req.files.file;
            fs.readFile(file.path, function (err, data) {
                if (err) {
                    reject({});
                } else {
                    var params = {
                        Bucket: config.s3FileUpload.bucket,
                        Key: "tasks/" + moment().valueOf() + file.originalFilename,
                        Body: data
                    }
                    s3upload(params, (err, resp) => {
                        if (err) {
                            reject({});
                        } else {
                            req.body.image = resp;
                            resolve({});
                        }
                    });
                }
            });
        } else {
            resolve({});
        }
    })
}