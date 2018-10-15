const Charity = require('../models/charity.js');

module.exports = function (app) {

        // INDEX
    app.get('/', (req, res) => {
        Charity.find()
            .then(charity => {
                res.render('orgs-index', { charity: charity });
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

    // DELETE
    app.delete('/orgs/:id', function (req, res) {
        console.log("DELETE the Organization")
        Charity.findByIdAndRemove(req.params.id).then((charity) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}