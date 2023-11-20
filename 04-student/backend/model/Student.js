const mongoose = require('mongoose');

const StudentDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  extraClassOpted: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },

  hobbies: {
    type: [String],
    required: true,
  },

  languages: {
    type: [String],
    enum: ['English', 'Gujarati', 'Hindi', 'Others'],
  },

  paper1: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  paper2: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  paper3: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  totalMarks: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StudentDetail', StudentDetailsSchema);
