
const express = require('express');
const router = express.Router();
const ldap = require('./ldap');


router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
});

router.use(ldap);

module.exports = router;