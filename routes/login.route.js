const express = require('express');
const router = express.Router(); 

const controller = require('../controllers/ctrl');

router.get('/', controller.loginUser);

router.post('/', controller.postLoginUser);

module.exports = router;