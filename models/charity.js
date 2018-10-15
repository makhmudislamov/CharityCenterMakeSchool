// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/charity-center', { useNewUrlParser: true });

var mongoose = require('mongoose');


// MODEL
module.exports = mongoose.model('Charity', {
    organizationName: String,
    description: String,
    donationNeeded: String
});
