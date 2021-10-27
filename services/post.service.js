const Post = require("../models/post.model")


/**
 * 
 * 
 */
async function getAllPost() {

    try {
        const posts = await Post.find({});

        if(!posts) {
            throw "Post not found!";
        }

        return posts;
    } catch (error) {
        console.log(error);
        return null;
    }
   
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

