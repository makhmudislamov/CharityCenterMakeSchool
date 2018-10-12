const express = require('express')
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));





const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-center');

        // MODEL
const Charity = mongoose.model('Charity', {
    organizationName: String,
    description: String,
    donationNeeded: String
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// INDEX
app.get('/', (req, res) => {
    Charity.find()
        .then(orgs => {
            res.render('charity-index', { orgs: orgs });
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/orgs/new', (req, res) => {
    res.render('orgs-new', {});
})

// CREATE
app.post('/orgs', (req, res) => {
    console.log(req.body);
     
})

// CREATE
app.post('/orgs', (req, res) => {
    Charity.create(req.body).then((orgs) => {
        console.log(orgs);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})