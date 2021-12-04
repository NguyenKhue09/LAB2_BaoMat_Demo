const express = require('express');
const router = express.Router(); 

const controller = require('../controllers/ctrl');

router.get('/', controller.signUpUser);

router.post('/', controller.postSignUpUser);

module.exports = router;