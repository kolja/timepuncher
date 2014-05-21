
/*
 * Login
 */

nano = require('nano')({url: "http://localhost:5984"});

module.exports = function(req, res){

    var login = req.body.name;
    var password = req.body.password;

    nano.request({
        method: "post",
        path: "_session",
        content_type: "application/json",
        headers: {
            name: login,
            password: password
        }
    }, function (err, body, headers) {
        if (err) { res.send(err.reason); return; }

        res.send("You are logged in! ");
    });
};
