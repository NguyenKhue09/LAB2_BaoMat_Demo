const express = require("express");
const router = express.Router();

const controller = require("../controllers/post.controller");

const middleware = require("../middlewares/post.middleware");

router.get("/:postId", controller.getPost);

router.get('/user/:id', controller.getUserPost);

router.post("/addPost", controller.initPost);

router.post("/deletePost", middleware.ownUserPost, controller.deletePost);

router.post("/updatePost", middleware.ownUserPost, controller.updatePost);

router.post("/addComment", controller.addComment);

module.exports = router;
