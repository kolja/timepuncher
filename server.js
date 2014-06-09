
/**
 * Module dependencies.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    favicon = require('serve-favicon'),
    cors = require('express-cors'),
    http = require('http'),
    path = require('path'),
    session = require('express-session'),
    Redis = require('connect-redis')(session),
    routes = require('./routes'),

    app = express(),
    router = express.Router();


app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/public/views');
app.use(cors({
    allowedOrigins: ['localhost:3000', '127.0.0.1:5984']
}));
// app.use(favicon());
app.use(bodyParser());
app.use(session({
    store: new Redis({
        url: "redis://@127.0.0.1:6379/db0"
    }),
    secret: 'redis-secret'
}));

// routes
router.use('/api/signup', routes.signup);
router.use('/api/login', routes.login);
router.use('/api/logout', routes.logout);
router.use('/secret', routes.secret);
router.use('/', routes.home);
app.use(router);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
