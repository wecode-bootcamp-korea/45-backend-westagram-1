const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('', userController.getAllUsers);
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);

module.exports = {
    router
}