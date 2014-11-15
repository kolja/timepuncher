var passport = require('koa-passport')
var Router = require('koa-router');
var public = new Router();

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

module.exports = public
