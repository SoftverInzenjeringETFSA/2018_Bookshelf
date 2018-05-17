'use strict';

let express = require('express');
let loginController = require('../controllers/registration/loginController');
let router = express.Router();

router.post('/', loginController.create.post);

module.exports = router;