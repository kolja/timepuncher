
/*
 * GET home page.
 */

var auth = "some stored cookie";
var nano = require('nano');
var cookie = require('cookie');
var redis = require("redis").createClient();

var authorized = function (req, res, next) {
    if (typeof req.headers.cookie !== 'string') {
        res.send(401);
    } else {
        var sessionCookie = cookie.parse(req.headers.cookie);
    }
    nano({
        url : 'http://localhost:5984',
        cookie: sessionCookie
    }).session(function(err,session) {
        if (!session.ok) {
            res.send(401);
        } else {
            next();
        }
    });
}

module.exports = function(req, res){
    authorized(req,res, function() {
        res.send('You can only see this, because you are logged in');
    });
};
