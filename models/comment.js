// const mongoose = require('mongoose')

var mongoose = require('mongoose');
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    charityId: { type: Schema.Types.ObjectId, ref: 'Charity' }
});

module.exports = Comment