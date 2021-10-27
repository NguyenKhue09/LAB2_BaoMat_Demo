const mongoose = require('mongoose')


/**Comment Model */
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, "Please add content in your comment!"]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    userComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;