var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');

router.post('/userSignup', authController.userSignup);
router.post('/userLogin', authController.userLogin);
module.exports = router;
