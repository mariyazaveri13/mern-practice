const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength:3,
    trim:true
  },
  content: {
    type: String,
    required: true,
    minLength:3
  },
  author: {
    type: String,
    required: true,
    match:/^[a-zA-Z ]*$/
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: [String],
    required: true,
  },
  updatedDate:{
    type:Date,
    default:Date.now
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
