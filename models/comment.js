// const mongoose = require('mongoose')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity-center', { useNewUrlParser: true });
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    charityId: { type: Schema.Types.ObjectId, ref: 'Charity' }
});

module.exports = Comment