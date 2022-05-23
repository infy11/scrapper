var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apicache = require('apicache');

var indexRouter = require('./routes/index');
var CACHE_DURATION = '5 minutes';
var cors = require('cors')
var app = express();
var db = require('./database');
require('dotenv').config({ path: './enviroment.env' })
const customLogger = require('./middleWares/logger');
const imageModel = require("./models/image");
const scrapModel = require('./models/scrap');
const videoModel = require('./models/video');
const assosiations = require('./models/assosiations');
const passport  = require('./middleWares/passport');
const renderToString=require("react-dom/server").renderToString //specifically created for server
const  App=require("./client/App").default //home component
const StaticRouter = require('react-router').StaticRouter
const React=require("react")

let cache = apicache.middleware
app.use(express.static('./public'));
app.use(logger('dev'));
app.use(customLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cache(CACHE_DURATION));

app.use('/api',passport.authenticate('basic', {session:false}), indexRouter);

app.get("*/", (req, res) => {
  const context = {};

  let html = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
  );
  console.log('html', html)
  res.send("<!DOCTYPE html>" + html);
});



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
  res.json('errors');
});

var initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
    await db.authenticate();
    imageModel.sync({alter: true});
    videoModel.sync({alter: true});
    scrapModel.sync({alter: true});
    assosiations()

    console.log("Connection has been established successfully");

  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
}

initApp();
module.exports = app;
