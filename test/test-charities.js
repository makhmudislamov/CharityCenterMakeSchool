const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Charity = require('../models/charity');

chai.use(chaiHttp);

const sampleCharity = {
    "organizationName": "Home of Kittens",
    "description": "Funding homeless cats",
    "donationNeeded": "$40,000"
}

describe('Charities', () => {

    after(() => {
        Charity.deleteMany({ organizationName: 'Super Sweet Donation' }).exec((err, charities) => {
            console.log(charities)
            charities.remove();
        })
    });

    // TEST INDEX
    it('should index ALL organizations on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
        chai.request(server)
            .get(`/orgs/new`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST CREATE
    it('should create a SINGLE organization on /orgs POST', (done) => {
        chai.request(server)
            .post('/orgs')
            .send(sampleCharity)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });

    // TEST SHOW
    it('should show a SINGLE review on /orgs/<id> GET', (done) => {
        var charity = new Charity(sampleCharity);
        charity.save((err, data) => {
            chai.request(server)
                .get(`/orgs/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE review on /orgs/<id>/edit GET', (done) => {
        var charity = new Charity(sampleCharity);
        charity.save((err, data) => {
            chai.request(server)
                .get(`/orgs/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST UPDATE
    it('should update a SINGLE org on /orgs/<id> PUT', (done) => {
        var charity = new Charity(sampleCharity);
        charity.save((err, data) => {
            chai.request(server)
                .put(`/orgs/${data._id}?_method=PUT`)
                .send({ 'organizationName': 'Updating the title' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE org on /orgs/<id> DELETE', (done) => {
        var charity = new Charity(sampleCharity);
        charity.save((err, data) => {
            chai.request(server)
                .delete(`/orgs/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
});
