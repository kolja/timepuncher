
/*
 * Login
 */

nano = require('nano')({url: "http://localhost:5984"});

module.exports = function(err, req, res, next){

    var login = req.body.name;
    var password = req.body.password;

    var callback = function ( err, message ) {
        if (err) { res.send(message + ": " + err); return; };
        console.log("--------------------------");
        console.log(message);
        res.send(message);
    };

    nano.auth(login, password, function (err, body, headers) {
        console.log("blork");
        if (err) { return callback(err, "login failed"); }

        if (headers && headers['set-cookie']) {
            req.session = headers['set-cookie'];
        }
        console.log(req.session);

        callback(null, "it worked");
    });

};
