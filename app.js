const express = require('express')
const methodOverride = require('method-override')
const charities = require('./controllers/charities');
const comments = require('./controllers/comments');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()
var exphbs = require('express-handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

const port = process.env.PORT || 3000;
app.listen(port);

// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

charities(app);
comments(app);

module.exports = app;