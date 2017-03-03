var db = require('../src/db');
var Q = require('q');

var SHOPS_COUNT = 1e2,
    PRODUCTS_COUNT = 1e3,
    REVIEWS_COUNT = 1e6;

var CITY_COUNT = 5,
    CATEGORY_FROM = 4,
    CATEGORY_TO = 9,
    VENDOR_COUNT = 10;

module.exports = {
    shops: function(req) {
        var sql = "SET @name = ?; SET @address = ?; SET @cityId = ?; CALL addShop(@name, @address, @cityId);";
        var tasks = (function(count) {
            var result = [];
            for(var i = 0; i < count; i++) {
                var name = randomString(20);
                var address = randomString(20);
                var city_id = ((Math.random() * CITY_COUNT)|0) + 1;
                result.push(db.query(req, sql, [
                    name, address, city_id
                ]));
            }
            return result;
        })(SHOPS_COUNT);
        return Q.all(tasks);
    },
    products: function(req) {
        var sql = "SET @p0 = ?; SET @p1= ?; SET @p2= ?; SET @p3= ?; CALL `addProduct`(@p0, @p1, @p2, @p3);";
        var tasks = (function(count) {
            var result = [];
            for(var i = 0; i < count; i++) {
                var name = randomString(20);
                var price = (Math.random() * 100000)|0;
                var categoryId = ((Math.random() * (CATEGORY_TO - CATEGORY_FROM))|0) + CATEGORY_FROM;
                var vendorId = ((Math.random() * VENDOR_COUNT)|0) + 1;
                result.push(db.query(req, sql, [
                    categoryId, vendorId, name, price
                ]));
            }
            return result;
        })(PRODUCTS_COUNT);
        return Q.all(tasks);
    }
};

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}