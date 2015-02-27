// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// config files
var port = process.env.PORT || 8080; // set our port

//DB
var db = require('./config/db');
mongoose.connect(db.url);
var Todo = require('./app/models/Todo');


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
// route to handle all angular requests
var api = require('./app/routes/api')(app, Todo);

app.get('/', function(req, res) {
	res.sendfile('./public/index.html');
});

// catch-all
app.get('*', function (req, res) {
	res.status(404).json({
	 error:'Invalid GET request'
	});
});

app.post('*', function (req, res) {
 	res.status(404).json({
 		 error:'Invalid POST request'
  });
});

app.delete('*', function (req, res) {
	res.status(404).json({
  	error:'Invalid DELETE request'
	});
});


// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app;
 						// expose app
