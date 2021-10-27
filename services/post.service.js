const Post = require("../models/post.model")


/**
 * 
 * 
 */
async function getAllPost() {

    const posts = await Post.find((err) => {
        if(!err) console.log("Get all post successful!");
        
        else console.log("Get all post failed!");
    });

    return posts;
}


/**
 * 
 * 
 * 
 */
async function getPostByUserId(userId) {

    const posts = await Post.find({userPostId: userId}, (err) => {
        if(!err) console.log("Get all post of user successful!");
        
        else console.log("Get all post of user failed!");
    });

    return posts;
}

module.exports = {
    getPostByUserId,
    getAllPost
}

