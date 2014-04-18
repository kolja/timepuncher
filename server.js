
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000 );
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
