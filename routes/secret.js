
/*
 * GET home page.
 */

var authorized = function (req, res, next) {
    if (!req.session) {
        res.send(401);
    } else {
        next();
    }
}

module.exports = function(req, res){
    if (!authorized(req,res)) { return };
    res.send('You can only see this, because you are logged in');
};
