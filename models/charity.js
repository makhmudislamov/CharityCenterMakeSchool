
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
mongoosePaginate.paginate.options = {
    limit: 3 // how many records on each page
}

// MODEL
const Charity = new Schema({
    organizationName: { type: String, required: true },
    description: { type: String, required: true },
    donationNeeded: { type: String, required: true }
}, {
    timestamps: true
});

Charity.plugin(mongoosePaginate);
module.exports = mongoose.model('Charity', Charity);

// READY