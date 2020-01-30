"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../controllers/posts.controller");
const auth = require('../../auth/auth.service');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), multipartMiddleware, controller.create);
router.post('/:id/likes', auth.isAuthenticated(), controller.createLike);
router.post('/:id/comments', auth.isAuthenticated(), multipartMiddleware, controller.createComments);
router.post('/:id/:comment/sub-comments', auth.isAuthenticated(), multipartMiddleware, controller.createSubComments);

export default router;