var express = require('express');
var router = express.Router();
var db = require('../src/db');
var init = require('../src/init');
var Q = require('q');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/init', function(req, res, next) {
  Q.all([
      //init.shops(req),
      init.products(req),
      //init.reviews(req)
  ]).then(function(results) {
    res.json(results.map(function(r) {
        return r;
    }));
  }).catch(function(reason) {
      console.error(reason);
  });
});

module.exports = router;