const Post = require("../models/post.model")


/**
 * 
 * 
 */
async function getAllPost() {

    try {
        const posts = await Post.find({}).populate('comments').populate('userPostId');

        if(!posts) {
            throw "Post not found!";
        } else {
            console.log("Get all post success");
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
    }).populate('comments').populate('userPostId');

    return posts;
}



module.exports = {
    getPostByUserId,
    getAllPost
}

