const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-center');
        // MODEL
const Charity = mongoose.model('Charity', {
    organizationName: String,
    description: String
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { organizationName: "Homeless Puppies", description: "some desc" },
//     { organizationName: "Crying Kittens", description: "some desc" }
// ]

// INDEX
// app.get('/', (req, res) => {
//     res.render('charity-index', { reviews: reviews });
// })

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
