const mongoose = require('mongoose');
const users = require("./user.model");
const posts = require('./post.model');

const notifySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notify must have userId belong to this notify"],
        ref: users
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Notify must belong to a post"],
        ref: posts
    },
    isRead: {
        type: Boolean,
        required: [true, "You must init value for isRead field"]
    },
    content: {
        type: String,
        required: [true, "Notify must have content"]
    }
})

const Notifies = mongoose.model("notify", notifySchema);

module.exports = Notifies;