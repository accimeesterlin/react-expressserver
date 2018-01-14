const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");



const PORT = process.env.PORT || 8080;


const app = express();

require('dotenv').config();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());


require('./passport')(passport);
require('./routes/users')(app);



app.listen(PORT, () => {
  console.log("App is starting");
});