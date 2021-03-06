const express = require('express')
const methodOverride = require('method-override')
const charities = require('./controllers/charities');
const comments = require('./controllers/comments');
const path = require('path');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()
var exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();




app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-center', { useNewUrlParser: true });

const port = process.env.PORT || 3000;
app.listen(port);

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// helpers setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: require('handlebars-helpers')(),
}));



app.use(express.static(path.join(__dirname, 'public')));
charities(app);
comments(app);

module.exports = app;