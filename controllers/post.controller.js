const postService = require("../services/post.service");
const commentService = require("../services/comment.service");

async function getPost(req, res) {
  const id = req.params.postId;
  //console.log(id);
  const post = await postService.getPostById(id);

  res.render("detailPost", {
    post: post,
    showTitle: true,
    layout: false,
  });
}

async function getUserPost(req, res) {
  const id = req.params.id;

  const userPosts = await postService.getPostByUserId(id);

  res.render("userPost", {
    posts: userPosts,
    showTitle: true,
    layout: false,
  });
}

async function initPost(req, res) {
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

  res.redirect("/");
}

async function deletePost(req, res) {
  const postId = req.body.postId;

  // Thực hiện xoá
  const result = await postService.deletePost(postId);
  //console.log(result);
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
  initPost,
  deletePost,
  updatePost,
  addComment,
  getPost,
  getUserPost,
};
