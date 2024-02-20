var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

// Routing Quiz
/*
1. routes/cats.js
2. var catsRouter = require('./routes/cats')
3. app.use('/cats', catsRouter)
4. route.get('/', catsCtrl.index)
5. route.get('/:id', catsCtrl.show)
6. route.get('/new', catsCtrl.new)
7. route.post('/', catsCtrl.create)
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));  // To log HTTP requests and responses
app.use(express.json());  // receive JSON data in request and parse into JS objects
app.use(express.urlencoded({ extended: false }));  // parse incoming request bodies with URL-encoded payload
app.use(cookieParser());  // adds middleware to parse cookies attached to incoming requests.
app.use(express.static(path.join(__dirname, 'public'))); //Requests to the server for static files will be matched against the files in the 'public' directory and served if found.

// all routers will start with the first argument(path)
app.use('/', indexRouter);
app.use('/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
