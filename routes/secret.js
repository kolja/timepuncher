
/*
 * GET home page.
 */

var Router = require('koa-router');

var index = function*() {
    this.body = yield this.render('app')
}

module.exports = function(app) {
    var secured = new Router()
    secured.get( '/app', index )
    app.use(secured.middleware());
};

