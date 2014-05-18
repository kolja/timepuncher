
/**
 * Module dependencies.
 */

var express = require('express'),
    cors = require('express-cors'),
    http = require('http'),
    path = require('path'),

    routes = require('./routes'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000 );
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('nobody-knows-this-secret-string'));
app.use(cors({
    allowedOrigins: ['localhost:3000', '127.0.0.1:5984']
}));
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.post('/api/signup', routes.signup);
app.post('/api/login', routes.login);
app.get('/api/logout', routes.logout);
app.get('/secret', routes.secret);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
