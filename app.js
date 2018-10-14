const express = require('express')
const methodOverride = require('method-override')
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));


// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


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
        .then(charity => {
            res.render('charity-index', { charity: charity });
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
    Charity.create(req.body).then((charity) => {
        console.log(charity);
        res.redirect(`/orgs/${charity._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// SHOW
app.get('/orgs/:id', (req, res) => {
    Charity.findById(req.params.id).then((charity) => {
        res.render('orgs-show', { charity: charity })
    }).catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/orgs/:id/edit', (req, res) => {
    Charity.findById(req.params.id, function (err, charity) {
        res.render('orgs-edit', { charity: charity });
    })
})

// UPDATE
app.put('/orgs/:id', (req, res) => {
    Charity.findByIdAndUpdate(req.params.id, req.body)
        .then(charity => {
            res.redirect(`/orgs/${charity._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})