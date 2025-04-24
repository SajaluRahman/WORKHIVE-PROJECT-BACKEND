// const express = require("express");
// const { createPost } = require("../controller/postController");
// const upload = require("../utils/multerConfig"); // Import the multer config

// const router = express.Router();

// // Route to add a post with multiple image uploads
// router.post("/add-post", upload, createPost);

// module.exports = { AddPostRouter: router };

const express = require("express");
const  {createPost, getAllPosts, deletePost}  = require("../controller/postController");
const { upload } = require("../utils/multerConfig");
const Post = require("../models/PostModel"); 

const router = express.Router();

// Route to add a post with multiple image uploads
router.post("/add-post", upload, createPost);
router.get("/all-posts",getAllPosts)
router.delete('/delete-post/:id', deletePost);

router.get("/single-post/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ post });
    } catch (err) {
      console.error("Error fetching post details", err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = { AddPostRouter: router };

