const mongoose = require('mongoose');
const comment = require("./comment.model");
const users = require("./user.model");

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
            ref: users
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: comment
        }]
    }
)

postSchema.index({name: 'text', 'title': 'text'});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;