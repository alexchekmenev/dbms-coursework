var express = require('express');
var router = express.Router();
var db = require('../src/db');

router.get('/', function(req, res, next) {
    var search = req.query.search;
    var city_id = req.query.city_id;
    var product_id = req.query.product_id;
    var explain = (req.query.explain == 1) || 0;
    var sql = '', params = [], pos = 0;
    if (search != null) {
        sql = "SET @s = ?; SET @cityId = ?; SET @e = ?; CALL searchShopsInCity(@cityId, @s, @e);";
        params = [search, city_id, explain];
        pos = 3;
    } else if (city_id != null && product_id != null) {
        sql = "SET @cityId = ?; SET @productId = ?; CALL getShopsWithProductInCity(@productId, @cityId);";
        params = [city_id, product_id];
        pos = 2;
    } else if (city_id != null) {
        sql = "SET @cityId = ?; CALL getShopsInCity(@cityId);";
        params = [city_id];
        pos = 1;
    } else if (product_id != null) {
        sql = "SET @productId = ?; CALL getShopsWithProduct(@productId);";
        params = [product_id];
        pos = 1;
    }
    db.query(req, sql, params).then(function(results) {
        res.json(results[pos]);
    }).then(function(reason) {
        res.json(reason);
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var sql = "SET @name = ?; SET @address = ?; SET @cityId = ?; CALL addShop(@name, @address, @cityId);";
    var params = [
        req.body.name, req.body.address, parseInt(req.body.city_id)
    ];
    db.query(req, sql, params).then(function (results) {
        res.json(results);
    }, function (reason) {
        res.json(reason);
    });
});


module.exports = router;