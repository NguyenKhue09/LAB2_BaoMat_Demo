const Post = require("../models/post.model")



async function addPost(data) {
    try {

        const newPost = new Post(data);

        const savePost = await newPost.save();

        if(savePost) console.log('Add new post successful!');       
        else    console.log("Add new post fail!");

        return savePost;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

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

async function getPostById(id) {

    const posts = await Post.find({_id: id}, (err) => {
        if(!err) console.log("Get post successful!");
        
        else console.log("Get post failed!");
    }).populate('comments').populate('userPostId');

    return posts;
}

async function getPostByPage(page) {
    try {
        if(page < 1) throw "Page must be bigger one";

        const postList = await Post.find().limit(10).skip(page*10).lean();

        if(!postList) throw "Page list not found!"
        return postList;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getNumberOfPost() {
    try {
        const numberOfPost = await Post.estimatedDocumentCount();

        if(!numberOfPost) throw "Number of post not found!";

        return numberOfPost;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function deletePost(postId) {

    const sess = await Post.startSession();
    sess.startTransaction();

    try {

        const deletePost = await Post.findByIdAndDelete(postId, {session: sess});

        if(deletePost) {
            const deleteComment = await deleteCommentByPost(postId);

            if(deleteComment) {
                console.log("Delete comment belong to post successful");
                await sess.commitTransaction();
            } else {
                throw "Delete comment belong to post fail!";
            }
        } else {
            throw "Post not found!";
        }

        sess.endSession();
        return true;
        
    } catch (error) {
        console.log(error);
        await sess.abortTransaction();
        sess.endSession();
        return false;
    }
}

async function updatePost(postId, newData) {
    try{

        let data = {};
        if(newData.title != null) {
            data = {title: newData.title};
        } 

        if(newData.description != null) {
            data = {...data, description: newData.description};
        }

        const update = await Post.findOneAndUpdate({
            _id: postId,
        },data)

        if(!update) throw "Update post fail!";

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function addCommentToPost(postId, commentId) {

    try {
        const addComment = await Post.updateOne({_id: postId}, {$push: { comments: commentId}});

        if(addComment) console.log("Add comment to post successful");
        else throw "Add comment to post failed";
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}



module.exports = {
    addPost,
    getPostByUserId,
    getAllPost,
    getPostByPage,
    updatePost,
    deletePost,
    getNumberOfPost,
    getPostById,
    addCommentToPost,
}



const {deleteCommentByPost} = require('../services/comment.service');