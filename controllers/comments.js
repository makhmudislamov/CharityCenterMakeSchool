const Comment = require('../models/comment.js');


module.exports = function (app) {

    // CREATE Comment
    app.post('/orgs/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/orgs/${comment.charityId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

}