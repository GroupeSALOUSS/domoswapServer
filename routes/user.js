
const express = require('express');

const router = express.Router()

const authController = require('../controllers/auth');
const userController = require('../controllers/user');


//sign up
router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

//userdb
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);




module.exports = router;