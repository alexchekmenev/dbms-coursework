var Q = require('q');

module.exports = {
    query: function (req, sql, params) {
        var defer = Q.defer();
        req.app.get('pool').getConnection(function(err, connection) {
            if (err) {
                defer.reject(err);
                return;
            }
            connection.query(sql, params, function (error, results) {
                connection.release();
                if (error) {
                    console.error(error);
                    defer.reject(error);
                    return;
                }
                defer.resolve(results);
            });

        });
        return defer.promise;
    }
};

