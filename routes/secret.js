
/*
 * GET home page.
 */

var Router = require('koa-router');
var secured = new Router();

var index = function*(next) {
    if (!this.isAuthenticated()) this.redirect('/');
    this.body = yield this.render('app')
}

module.exports = secured.get( '/app', index )


