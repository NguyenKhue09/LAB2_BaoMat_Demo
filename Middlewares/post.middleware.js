const postService = require('../services/post.service');

async function ownUserPost (req, res, next) {
    const currentUserId = req.signedCookies.userId;

    const postId = req.body.postId;
    const deletingPost = await postService.getPostById(postId);
    console.log(postId);

    if (deletingPost.userPostId._id != currentUserId) {
        // console.log(deletingPost.userPostId._id == currentUserId);
        //console.log(currentUserId)
        res.redirect('/');
        return;
    }

    next();
}


module.exports = {
    ownUserPost,
}