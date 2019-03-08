const express = require('express')
const methodOverride = require('method-override')
const charities = require('./controllers/charities');
const comments = require('./controllers/comments');
const mongoose = require('mongoose');
const path = require('path');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()
var exphbs = require('express-handlebars');
const pug = require('pug');


app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-center', { useNewUrlParser: true });

const port = process.env.PORT || 3000;
app.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
charities(app);
comments(app);

module.exports = app;