var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const mongoose = require('mongoose');
const configDB = require('./database/mongodb.json');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var etudiantRouter =require('./routes/etudiant');
var app = express();

mongoose.connect(
  configDB.mongo.uri,
  {useNewUrlParser:true,useUnifiedTopology:true},

  
).then(()=>{
  console.log("connect to database");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/etudiant', etudiantRouter);
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

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
