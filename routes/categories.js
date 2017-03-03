/**
 * Created by creed on 03.03.17.
 */
var express = require('express');
var router = express.Router();
var db = require('../src/db');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/buy', function(req, res, next) {
    res.render('index');
});


module.exports = router;