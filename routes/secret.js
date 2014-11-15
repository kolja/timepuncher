
/*
 * GET home page.
 */

var Router = require('koa-router');
var secured = new Router();


var index = function*(next) {
    if (this.isAuthenticated()) {
        this.body = yield this.render('app')
    } else {
        this.redirect('/')
    }
}

module.exports = secured.get( '/app', index )


