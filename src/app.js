var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routerDefined = require('./routes/defaultRouter.js');

var app = express();
const port = 3000;

// var accessLogStream = fs.createWriteStream(
//   path.join(__dirname, 'access.log'), { flags: 'a' }
// );
// app.use(logger('combined', { stream: accessLogStream }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

routerDefined(app);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
});

// error handler
app.use(function (err, req, res) {
  //res.status(500).send('Something broke!');
  res.status(500).send(err);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});