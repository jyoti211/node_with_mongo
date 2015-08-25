var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var gapi = require('./lib/gapi');
var user = require('./controller/user');
var app = express();
var expressValidator = require('express-validator');

/* passport authentication */
 var passport = require("passport");
// var flash    = require('connect-flash');
 var LocalStrategy = require('passport-local').Strategy;
 var admin = require('./controller/admin');
 
 /*  */


app.set('views', path.join(__dirname, 'views'));

//app.set('uploads', path.join(__dirname, 'uploads'));
var engine = require('ejs-locals');
var multer = require('multer');
var done = false;
app.engine('ejs', engine);

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(multer({
	dest : './uploads/',
	rename : function(fieldname, filename) {
		return filename + Date.now();
	},
	onFileUploadStart : function(file) {
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete : function(file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
		done = true;
	}
}));

app.use('/', admin);



// start the rest of your app here
app.get('/', function(req, res) {
	var locals = {
		url : gapi.url
	};
	res.render('index', locals);
});
app.get('/user', function(req, res) {
	res.render('home', {
		title : 'title',
		errors : '',
		method : 'get'
	});
});
app.post('/adduser', user.adduser);
app.get('/listuser', user.listuser);
app.get('/edit/*', user.edituser);
app.post('/updateuser', user.updateuser);
app.get('/deleteuser/*', user.deleteuser);

app.get('/listuserapi', user.listapi);

app.get('/whereamI', function(req, res) {
	res.render('whereamI');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;

app.listen(3011);
