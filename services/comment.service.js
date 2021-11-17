const Comment = require("../models/comment.model");

async function addComment(data) {
  try {
    const newComment = new Comment(data);
    console.log(data);
    const saveComment = await newComment.save().then(async (comment) => {
      await addCommentToPost(data.post, comment._id);
      if (comment) console.log("Add comment successful!");
      else console.log("Add comment unsuccessful!");
      return comment;
    });

    return saveComment;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteCommentByPost(post) {
  try {
    const deleteMany = await Comment.deleteMany({ post });

    console.log(deleteMany);
    if (deleteMany) {
      console.log("Deleted all comment belong to post successful");
    } else {
      throw "Deleted all comment fail!";
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  deleteCommentByPost,
  addComment,
};

const { addCommentToPost } = require("../services/post.service");
