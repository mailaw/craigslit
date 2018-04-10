var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
var MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL)
mongoose.connect(MONGO_URL, function(err){
  if (err) throw "YOOOOOOOOOOO" + err;
  else{console.log("DATABASE CONNECTED!!!")}
});
var Schema = mongoose.Schema;

var clistSchema = new Schema({
    img: { data: String, contentType: String },
    title: {type: String, required: true},
    description: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    uploadDate: {type: Date, default: Date.now}
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
