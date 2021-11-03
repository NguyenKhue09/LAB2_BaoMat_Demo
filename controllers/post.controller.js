
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

    // Thực hiện xoá

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