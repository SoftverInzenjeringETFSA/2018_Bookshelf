'use strict';

/*******************
 * Registration route
 * path: /registration
 ******************** */

let express = require('express');
let registrationController = require('../controllers/registration/registrationController');
let router = express.Router();

router.post('/', registrationController.create.post);

module.exports = router;