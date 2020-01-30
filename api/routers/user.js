"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../controllers/user.controller");
const { check, body } = require("express-validator");
const auth = require("../../auth/auth.service");

router.get("/",  controller.index);
router.get("/me", auth.isAuthenticated(), controller.me);
router.get("/:id", auth.isAuthenticated(), controller.show);
router.post(
	"/",
	[
		check("email").isEmail(),
		check("first_name").isLength({ min: 3 }),
		check("mobile")
			.isLength({ min: 10 })
			.withMessage("Must be at least 10 numbers")
			.isNumeric(),
		check("password")
			.isLength({ min: 5 })
			.withMessage("must be at least 5 chars long")
			.matches(/\d/)
			.withMessage("must contain a number")
	],
	controller.create
);

export default router;
