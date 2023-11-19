const mongoose = require('mongoose');

const PersonScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  //if age is less then 10 throw error of not accepted
  age: {
    type: Number,
    required: true,
    min: 10,
  },
  readsNewspaper: {
    type: Boolean,
    default: false,
  },
  //Split hobbies by comma and store them
  hobbies: {
    type: [String],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  paper1: {
    type: Number,
    required: true,
  },
  paper2: {
    type: Number,
    required: true,
  },
  paper3: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    enum: ['Hindi', 'English', 'Gujarati', 'Others'],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Person', PersonScheme);
