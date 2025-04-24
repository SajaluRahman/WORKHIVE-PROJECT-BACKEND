const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String, // Image file name or URL
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", profileSchema);
