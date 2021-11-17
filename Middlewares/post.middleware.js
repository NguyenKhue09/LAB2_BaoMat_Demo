const postService = require('../services/post.service');

async function ownUserPost (req, res, next) {
    const currentUserId = req.signedCookies.userId;

    const postId = req.body.id;
    const deletingPost = await postService.getPostById(postId);
    console.log(deletingPost);

    if (deletingPost.userPostId != currentUserId) {
        res.redirect('/');
    }

    next();
}


module.exports = {
    ownUserPost,
}