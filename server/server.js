var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser')

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var expressValidator  = require('express-validator');//req.checkbody()
var fileUpload = require('express-fileupload');
//const mongoConfig = require('./configs/mongo-config');
var indexRouter = require('./routes/index');


/*mongoose.connect(mongoConfig.mongourl, { useNewUrlParser: true, useCreateIndex: true, },function(error){
  if(error) throw error
    console.log(`connect mongodb success`);
});*/

var app = express()
app.use(fileUpload({ useTempFiles:true }))
app.use(cors())

// Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
    root          = namespace.shift(),
    formParam     = root;

    while(namespace.lenght) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static dir
app.use(express.static(path.join(__dirname, 'public')));

//routers
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "file is too large",
          });
        }
    
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            message: "File limit reached",
          });
        }
    
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            message: "File must be an image",
          });
        }
    }
  res.status(err.status || 500).json(err);
});

app.listen(4000, () => console.log("listening on port 4000"));

module.exports = app;