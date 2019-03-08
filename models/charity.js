
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
Schema = mongoose.Schema;
mongoosePaginate.paginate.options = {
    limit: 3 // how many records on each page
}

// MODEL
const Charity = new Schema({
    organizationName: String,
    description: String,
    donationNeeded: String
})

Charity.plugin(mongoosePaginate);
module.exports = mongoose.model('Charity', Charity);