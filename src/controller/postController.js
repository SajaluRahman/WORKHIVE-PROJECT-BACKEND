const Post = require("../models/PostModel.js");

exports.createPost = async (req, res) => {
  try {
    const {
      title, category, description, description1, price, pay,
      hourlyRate, duration, requirements, skillsNeeded,
      qualifications, paymentStructure, bonus, paymentMethod, paymentFrequency
    } = req.body;
    console.log(req.body);

    // Images
    const imagePaths = req.files.map(file => file.filename);

    // Skills array safely parsed
    let parsedRequirements = [];
    try {
      parsedRequirements = requirements ? JSON.parse(requirements) : [];
      } catch (error) {
        return res.status(400).json({ error: "Invalid requirements format" });
        }
    let parsedSkills = [];
    try {
      parsedSkills = skillsNeeded ? JSON.parse(skillsNeeded) : [];
    } catch (error) {
      return res.status(400).json({ error: "Invalid skillsNeeded format" });
    }

    const newPost = new Post({
      title,
      category,
      description,
      description1,
      price,
      pay,
      hourlyRate,
      duration,
      requirements:parsedRequirements,
      skillsNeeded: parsedSkills,
      images: imagePaths,
      qualifications,
      paymentStructure,
      bonus,
      paymentMethod,
      paymentFrequency
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
    try {
      // Retrieve all posts from the database
      const posts = await Post.find();
  
      // If no posts are found, return a message
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }
  
      // Return all posts
      res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
 

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
