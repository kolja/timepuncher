var koa = require('koa');
var app = koa();

var session = require('koa-generic-session');
var bodyParser = require('koa-bodyparser');
var passport = require('koa-passport')
var views = require('koa-render');

// sessions
app.keys = ['your-session-secret'];
app.use(session());
app.use(bodyParser())

// append view renderer
app.use(views('./views', {
    map: { html: 'handlebars' },
    cache: false
}))

// authentication
// what's going on here? Sideeffect? is passport a singleton?
// https://github.com/rkusa/koa-passport-example
require('./auth')
app.use(passport.initialize())
app.use(passport.session())

// Routes
var secured = require('./routes/secret.js');
var public = require('./routes/public.js');

app.use(public.middleware());
app.use(secured.middleware());

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port "+port);

