var express = require('express');
var path = require('path');
var debug = require('debug')('gis-talk-bot-v2:app');
var bodyParser = require('body-parser');

var backoffice = require('./routes/ask');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(check_header);
app.use('/ask', backoffice);


/* Avoid requests that came out of dialogflow */

function check_header(req,res,next) {
  if(req.headers[process.env["BOT_HEADER"]] === process.env["BOT_SECRET"] || process.env["BOT_MODE"] === "development") {
    next();
  } else {
    debug("BOT_SECRET mismatch");
    res.status(401).json({ message : "Not Authorized"});
    res.end();
  }
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
