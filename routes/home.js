
/*
 * GET home page.
 */

module.exports = function(req, res){
    if (!auth) { res.send(401); return; }
    res.render('index', { title: 'Express' });
};

