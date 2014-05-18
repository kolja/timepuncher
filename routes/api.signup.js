
/*
 * Signup
 */

nano = require('nano')

module.exports = function(req, res){

    var login = req.body.name;
    var password = req.body.password;

    var db = nano({
        url: 'http://localhost:5984/_users'
    });

    db.insert({
        type: "user",
        name: login,
        password: password,
        roles: [],
    },{
        doc_name: 'org.couchdb.user:'+login,
        Accept: "application/json",
        content_type: "application/json"
    }, function (err, body, headers) {
        if (err) { res.send(err.reason); return; }

        res.send("you have signed up as "+login);
    });
};
