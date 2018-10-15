const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-center', { useNewUrlParser: true });

// MODEL
module.exports = mongoose.model('Charity', {
    organizationName: String,
    description: String,
    donationNeeded: String
});
