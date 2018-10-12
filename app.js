const express = require('express')
const app = express()



app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { OrganizationName: "Homeless Puppies", Description: "some desc" },
    { OrganizationName: "Crying Kittens", Description: "some desc" }
]

// INDEX
app.get('/', (req, res) => {
    res.render('charity-index', { reviews: reviews });
})