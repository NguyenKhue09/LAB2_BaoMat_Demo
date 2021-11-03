const Comment = require('../models/comment.model')



async function addComment(data) {
    try {

        const newComment = new Comment(data);

        const saveComment = await newComment.save();

        if(saveComment) console.log('Add comment successful!');       
        else    console.log('Add comment unsuccessful!');

        return saveComment;

    } catch (error) {
        
        console.log(error.message);
        return null;
    }
}

async function deleteCommentByPost(post) {
    try {
        const deleteMany = await Comment.deleteMany({post});

        if(deleteMany.ok === 1 && deleteMany.n === deleteMany.deletedCount) {
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
    addComment
}