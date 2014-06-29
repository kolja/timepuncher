
/*
 * Login
 */

var nano = require('nano')({url: "http://localhost:5984"});
var redis = require("redis").createClient();
var cookie = require('cookie');

module.exports = function( req, res, next){

    var login = req.body.name;
    var password = req.body.password;

    var callback = function ( err, message ) {
        if (err) { res.send(message + ": " + err); return; };
        res.send(message);
    };

    nano.auth(login, password, function (err, body, headers) {
        if (err) { return callback(err, "login failed"); }
        if (headers && headers['set-cookie']) {
            var key = cookie.parse(headers['set-cookie'][0]).AuthSession;
            // redis.set('AuthSession', headers['set-cookie']);
            res.cookie('session', key, { maxAge: 900000, httpOnly: true });
        }
        console.log(body);
        console.log(headers);

        callback(null, "it worked");
    });

};
