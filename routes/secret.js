
/*
 * GET home page.
 */

var Router = require('koa-router');
var secured = new Router();

var index = function*() {
    this.body = yield this.render('app')
}

module.exports = secured.get( '/app', index )


