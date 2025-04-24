// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema({
//   title: String,
//   category: String,
//   description: String,
//   description1: String,
//   price: Number,
//   pay: String,
//   hourlyRate: Number,
//   duration: String,
//   requirements: String,
//   skillsNeeded: [String],
//   images: [String],
//   qualifications: String,
//   paymentStructure: String,
//   bonus: Number,
//   paymentMethod: String,
//   paymentFrequency: String,
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Post", postSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    description1: String,
    price: Number,
    pay: String,
    hourlyRate: Number,
    duration: String,
    requirements: [String],
    skillsNeeded: [String],
    images: [String],
    qualifications: String,
    paymentStructure: {
        type: [String],  // Change this to an array of strings
        
      },
    bonus: String,
    paymentMethod: String,
    paymentFrequency: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;