var express = require('express');
var router = express.Router();
var db = require('../src/db');

router.get('/', function(req, res, next) {
    res.render('index');

});


router.post('/deliver', function(req, res, next) {
    res.render('index');
    "SET @p0='2'; SET @p1='8'; SET @p1='1000'; CALL `deliverProduct`(@p0, @p1, @p2);"
});


router.post('/buy', function(req, res, next) {
    res.render('index');
    "SET @p0='5'; SET @p1='2'; SET @p2='Nexus'; SET @p3='16000'; CALL `addProduct`(@p0, @p1, @p2, @p3);";
});


module.exports = router;