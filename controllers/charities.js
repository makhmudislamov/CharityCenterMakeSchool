const Charity = require('../models/charity.js');
const Comment = require('../models/comment.js');

module.exports = function (app) {

        // INDEX
    app.get('/', (req, res) => {
        // const page = req.query.page || 1
        Charity.find()
            .then((charities) => {
                res.render('orgs-index', { charities: charities});
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
    });

    // app.post('/orgs', (req, res) => {
    //     var charity = new Charity(req.body);

    //     charity.save()
    //         .then((charity) => {
    //             res.send({ charity: charity });
    //         })
    //         .catch((err) => {
    //             // STATUS OF 400 FOR VALIDATIONS
    //             res.status(400).send(err.errors);
    //         });
    // });

    // SHOW
    app.get('/orgs/:id', (req, res) => {
        // find review
        Charity.findById(req.params.id).then(charity => {
            // fetch its comments
            Comment.find({ charityId: req.params.id }).then(comments => {
                // respond with the template with both values
                res.render('orgs-show', { charity: charity, comments: comments })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

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

    // SEARCH CHARITY
    app.get('/search', (req, res) => {
        term = new RegExp(req.query.term, 'i')

        Charity.find({
            $or: [
                { 'organizationName': term },
                { 'donationNeeded': term }
            ]
        }).exec((err, charities) => {
        
            res.render('orgs-index', { charities: charities });
        })
    });

}