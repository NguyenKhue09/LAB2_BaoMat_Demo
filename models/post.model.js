const mongoose = require('mongoose')

/**Post model */
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Please add title your post!"]
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Please add description your post!"]
        },
        userPostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }]
    }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;