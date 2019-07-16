"use strict";

import express from "express";
const router = express.Router();
const controller = require("../controllers/user-role.controller");

router.get("/", controller.index);
router.get("/:id", controller.show);

module.exports = router;
