
/*
 * GET home page.
 */
var auth = true;
module.exports = function(req, res){
    if (!auth) { res.send(401); return; }
    res.render('cards.html', { title: 'Express' });
};

