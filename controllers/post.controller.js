const postService = require('../services/post.service');

async function initPost (req, res) {
    // Dữ liệu bài đang mới 
    const newPost = {
        title: req.body.title,
        description: req.body.description,
        userPostId: req.signedCookies.userId,
    };


}

async function deletePost (req, res) {
    const postId = req.body.id;

    const postInfo = await postService.getPostByUserId();

    // Thực hiện xoá
    const result = await postService.deletePost(postId);

    if (result) {
        console.log("Deleted post");
    } else {
        console.log("Falied in deleting post")
    }

    res.redirect('/');
}

async function updatePost (req, res) {
    const newData = {
        title: req.body.title,
        description: req.body.description,
    }

    // Cập nhật dữ liệu của bài post
}

// Đăng 1 bình luận mới 
async function addComment (req, res) {
    const newComment = {
        text: req.body.text,
        post: req.body.postId,
        userComment: req.signedCookies.userId,
    }
}


module.exports = {
    initPost,
    deletePost,
    updatePost,
    addComment,
};