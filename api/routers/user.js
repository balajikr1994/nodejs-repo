"use strict";

import express from "express";
import { resourceModel } from "../../config/resource";
const router = express.Router();
const controller = require("../controllers/user.controller");
const { check } = require('express-validator');

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", [check('email').isEmail(),
check('first_name').isLength({ min: 3 }),
check('mobile').isLength({ min: 10 }).withMessage('Must be at least 10 chars long').isNumeric()
], controller.create);


module.exports = router;