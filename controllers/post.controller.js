const postService = require('../services/post.service');
const commentService = require('../services/comment.service');

async function getPost (req, res) {
    const id = req.params.postId;

    const post = await postService.getPostById(id);

    res.render('detailPost', {
        post: post,
        showTitle: true,
        layout: false,
    });
}

async function initPost (req, res) {
    // Dữ liệu bài đang mới 
    const newPost = {
        title: req.body.title,
        description: req.body.description,
        userPostId: req.signedCookies.userId,
    };

    const result = await postService.addPost(newPost);

    if (result) {
        console.log("Created post");
    } else {
        console.log("Falied in creating post");
    }

    res.redirect('/');
}

async function deletePost(req, res) {
  const postId = req.body.id;

  // Thực hiện xoá
  const result = await postService.deletePost(postId);

  if (result) {
    console.log("Deleted post");
  } else {
    console.log("Falied in deleting post");
  }

  res.redirect("/");
}

async function updatePost(req, res) {
  const postId = req.body.id;

  const newData = {
    title: req.body.title,
    description: req.body.description,
  };

  // Cập nhật dữ liệu của bài post
  const result = await postService.updatePost(postId, newData);

  if (result) {
    console.log("Updated post");
  } else {
    console.log("Falied in updating post");
  }

  res.redirect("/");
}

// Đăng 1 bình luận mới
async function addComment(req, res) {
  const newComment = {
    text: req.body.text,
    post: req.body.postId,
    userComment: req.signedCookies.userId,
  };

  const result = await commentService.addComment(newComment);

  if (result) {
    console.log("Added comment to post");
  } else {
    console.log("Falied in adding comment to post");
  }

  res.redirect("/");
}

module.exports = {
<<<<<<< HEAD
    initPost,
    deletePost,
    updatePost,
    addComment,
    getPost,
};
=======
  initPost,
  deletePost,
  updatePost,
  addComment,
};
>>>>>>> c5673e0e728e97338ed195f157feae99cac921e9
