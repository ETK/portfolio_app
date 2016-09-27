'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/accounts', require('./accounts'));
router.use('/transactions', require('./transactions'));
router.use('/tickers', require('./tickers'));
router.use('/prices', require('./prices'));
router.use('/holdings', require('./holdings'));

// No matching routes - respond with 404
router.use(function (req, res) {
    res.status(404).end();
});
