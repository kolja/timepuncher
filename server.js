var koa = require('koa');
var app = koa();
var session = require('koa-generic-session');
var bodyParser = require('koa-bodyparser');
var passport = require('koa-passport');
var Router = require('koa-router');
var views = require('koa-render');

var secured = require('./routes/secret.js');

// sessions
app.keys = ['your-session-secret'];
app.use(session());

// body parser
app.use(bodyParser())

// authentication
require('./auth')
app.use(passport.initialize())
app.use(passport.session())

// append view renderer
app.use(views('./views', {
  map: { html: 'handlebars' },
  cache: false
}))

// public routes

var public = new Router()

public.get('/', function*() {
  this.body = yield this.render('login')
})

public.post('/custom', function*(next) {
  var ctx = this
  yield* passport.authenticate('local', function*(err, user, info) {
    if (err) throw err
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      yield ctx.login(user)
      ctx.body = { success: true }
    }
  }).call(this, next)
})

// POST /login
public.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

public.get('/logout', function*(next) {
    console.log(this);
    this.logout()
    this.redirect('/')
})

public.get('/auth/twitter',
  passport.authenticate('twitter')
)

public.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

public.get('/auth/google',
  passport.authenticate('google')
)

public.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

app.use(public.middleware())


// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.redirect('/')
  }
})

app.use(secured.middleware());

// start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port "+port);

