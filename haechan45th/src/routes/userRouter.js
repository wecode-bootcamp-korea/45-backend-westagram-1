const express = require('express');
const userController = require('../controllers/userController');

const validateToken = require("../middlewares/auth");

const router = express.Router();

router.get('', validateToken, userController.getAllUsers);
router.post('/signup', userController.signUp);

module.exports = {
    router
}