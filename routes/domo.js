const express = require('express');
const router = express.Router()
const domoController = require('../controllers/domo');
const auth = require('../middleware/auth');
//const  multer  = require('../middleware/multer-config');

router.post('/n', auth.checkUser,domoController.domoCreate);

//domodb
router.get('/', auth.checkUser,domoController.getAllDomos);
router.get('/:id', auth.checkUser,domoController.domoInfo);
router.put('/:id',auth.checkUser, domoController.updateDomo);
router.delete('/:id',auth.checkUser,domoController.deleteDomo);

module.exports = router;