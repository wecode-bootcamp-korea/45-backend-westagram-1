const express = require('express');
const userController = require('../controllers/userController');

// const validateToken = require("../middleware/auth");

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/signup', userController.signUp);

module.exports = {
    router
}