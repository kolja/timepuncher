
/*
 * Login
 */

nano = require('nano')({url: "http://localhost:5984"});

module.exports = function(req, res){

    var cookies = {};
    var login = req.body.name;
    var password = req.body.password;
    var callback = function ( err, message ) {
        if (err) { res.send(message + ": " + err.reason); return; };
        res.send(message);
    };

    nano.auth(login, password, function (err, body, headers) {
        if (err) { return callback(err, "login failed"); }

        if (headers && headers['set-cookie']) {
            cookies[login] = headers['set-cookie'];
        }
        console.log(body);
        console.log(headers);

        callback(null, "it worked");
    });

};
