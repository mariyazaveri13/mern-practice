const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
    enum: ['Remote', 'Onsite'],
  },
  qualification: {
    type: String,
  },

  
  jobSalary: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['rs', 'usd'],
  },
  newsletterSignup: {
    type: Boolean,
    default: false,
  },
  skillsSet: {
    type: [String],
    required: true,
    enum: ['Communication', 'Leadership', 'Management'],
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
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

module.exports = mongoose.model('Job', JobsSchema);
