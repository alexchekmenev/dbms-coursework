var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../config');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/mysql', function(req, res, next) {
  var connection = mysql.createConnection(config);
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ', err);
      return res.json(err);
    }

    var sql = 'SELECT * FROM Category WHERE 1';
    connection.query(sql, [], function (error, results, fields) {
      if (error) {
        console.error(error);
        return close(connection, res, error)
      }
      close(connection, res, results);
    });

  });
});

function close(connection, res, result) {
  connection.end(function(err) {
    if (err) {
      console.error(err);
      return res.end(err);
    }
    res.json(result);
  });
}

module.exports = router;