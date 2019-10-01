"use strict";

import express from "express";
const router = express.Router();
const controller = require("../controllers/user.controller");
const { check } = require('express-validator');
const auth = require('../../auth/auth.service');

router.get("/", auth.isAuthenticated(), controller.index);
router.get("/me", auth.isAuthenticated(), controller.me);
router.get("/:id", auth.isAuthenticated(), controller.show);

router.post("/", [
    check('email').isEmail(),
    check('first_name').isLength({ min: 3 }),
    check('mobile').isLength({ min: 10 }).withMessage('Must be at least 10 chars long').isNumeric()
], controller.create);


module.exports = router;