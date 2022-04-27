
const express = require('express');

const router = express.Router()

const authController = require('../controllers/auth');
const userController = require('../controllers/user');


//sign up
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

//userdb
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.userInfo);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);




module.exports = router;