'use strict';
let express = require('express');
let userController = require('../controllers/user/userController');
let router = express.Router();

router.post('/', userController.register.post);
router.get('/', userController.all.get);
router.get('/:id', userController.read.get);

module.exports = router;