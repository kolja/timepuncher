
/*
 * GET home page.
 */

var authorized = function (req, res) {
    if (!req.cookies['AuthSession']) {
        res.send(401);
        return false;
    } else {
        return true;
    }
}

module.exports = function(req, res){
    if (!authorized(req,res)) { return };
    res.send('You can only see this, because you are logged in');
};
