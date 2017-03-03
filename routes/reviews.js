var express = require('express');
var router = express.Router();
var db = require('../src/db');

router.get('/', function(req, res, next) {
    var product_id = req.query.product_id;
    var explain = (req.query.explain == 1) || false;
    var sql = 'SELECT * FROM Review' + (product_id != null ? ' WHERE product_id = ?' : '');
    if (explain) {
        sql = 'EXPLAIN ' + sql;
    }
    var params = (product_id != null ? [product_id] : []);
    db.query(req, sql, params).then(function(results) {
        res.json(results);
    }).then(function(reason) {
        res.json(reason);
    });
});

router.post('/', function(req, res, next) {
    var sql = "SET @pId = ?; SET @t = ?; SET @p = ?; CALL addReview(@pId, @t, @p);";
    var params = [
        req.body.product_id, req.body.description, req.body.points
    ];
    db.query(req, sql, params).then(function (results) {
        res.json(results);
    }, function (reason) {
        res.json(reason);
    });
});


module.exports = router;

