
/*
 * Login
 */

nano = require('nano')

module.exports = function(req, res){

    var db = nano({
        url: 'http://localhost:5984',
        cookie: 'AuthSession' + req.cookies['AuthSession']
    });

    db.request({
        method: "POST",
        db: "_session",
        form: { name: "timepuncher", password: "timepuncher" },
        content_type: "application/x-www-form-urlencoded; charset=utf-8"
    }, function (err, body, headers) {
        if (err) { res.send(err.reason); return; }

        // Send CouchDB's cookie right on through to the client
        if (headers && headers['set-cookie']) {
            res.cookie(headers['set-cookie']);
        }

        res.send('Logged in!');
    });
};
