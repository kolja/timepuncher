
/*
 * Logout
 */

module.exports = function(req, res){
    res.clearCookie('AuthSession');
    res.send('Logged out!');
};
