var express = require('express');
var expressValidator = require('express-validator');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var flash = require('express-flash');

var app = express();
console.log('q')


var MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
var EXPRESS_PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
console.log('w')

app.set('port', EXPRESS_PORT);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'YOUR_SECRET_HERE'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(request, response, callback) {
  response.locals.user = request.user;
  callback();
});

app.use(function(request, response, callback) {
  if (/api/i.test(request.path)) {
    request.session.returnTo = request.path;
  }
  callback();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var passportConf = require('./config/passport');
app.get('/', homeController.homePage);
app.get('/login', userController.loginPage);
app.post('/login', userController.login);
app.get('/logout', userController.logout);
app.get('/signup', userController.signupPage);
app.post('/signup', userController.signup);

app.get('/account', passportConf.isAuthenticated, userController.accountManagementPage);
app.post('/account/delete', passportConf.isAuthenticated, userController.deleteAccount);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
