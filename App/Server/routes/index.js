var express = require('express');
var router = express.Router();
const users = require ('./users.js');

router.use(users);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: "Hello, world!"});
});

module.exports = router;
