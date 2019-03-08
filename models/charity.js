
// const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');
// Schema = mongoose.Schema;
// mongoosePaginate.paginate.options = {
//     limit: 3 // how many records on each page
// }

// // MODEL
// const Charity = new Schema({
//     organizationName: String,
//     description: String,
//     donationNeeded: String
// })

// Charity.plugin(mongoosePaginate);
// module.exports = mongoose.model('Charity', Charity);


"use strict";
const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose'),

    Schema = mongoose.Schema;
mongoosePaginate.paginate.options = {
    limit: 3 // how many records on each page
};
const Charity = new Schema({
    organizationName: { type: String, required: true }
    , picUrl: { type: String }
    , picUrlSq: { type: String }
    , avatarUrl: { type: String, required: true }
    , description: { type: String, minlength: 140, required: true }
    , donationNeeded: { type: Number, required: true }
}, {
        timestamps: true
    });

PetSchema.index({ name: 'text', species: 'text', favoriteFood: 'text', description: 'text' });
PetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Charity', Charity);