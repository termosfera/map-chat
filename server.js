// Dependencies
// -----------------------------------------------------
var express         = require('express');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var app             = express();

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/public/bower_components',
    express.static(__dirname + '/public/bower_components'));           // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

// Routes
// ------------------------------------------------------
//require('./app/routes.js')(app);

// Listen
// -------------------------------------------------------
var sockets = require('./lib/sockets');
var http = require('http').Server(app);
sockets.startSocketServer(http);

http.listen(port, function () {
    console.log('listening on localhost:' + port);
});