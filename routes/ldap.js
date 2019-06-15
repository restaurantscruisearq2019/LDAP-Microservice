const express = require('express');
const router = express.Router();
var authorizationMiddleware = require('../config/authorizationMiddleware');

router.get('/LDAPLogin', authorizationMiddleware, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;