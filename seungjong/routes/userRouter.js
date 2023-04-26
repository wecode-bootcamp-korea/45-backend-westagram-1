const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authorization } = require("../utils/authorization");

router.post("/signup", userController.signUp);
router.post("/logIn", authorization, userController.logIn);

module.exports = { router };
