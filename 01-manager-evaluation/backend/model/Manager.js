const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  //First things first, what’s the name of the manager you’re evaluating today?
  nameOfManager: {
    type: String,
    required: true,
    default: 'Mariya',
  },
  //And how long have you been working with _____?

  workExp: {
    type: String,
    enum: [
      'Less than a year',
      '2 - 3 years',
      '4 - 6 years',
      '7-10 years',
      '10+ years',
    ],
    required: true,
    default: '7-10 years',
  },

  //And how would you rate _____'s overall management skills?
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
    default: 4,
  },

  //_____ creates a work environment in which everyone can give their best
  workEnvRating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    default: 5,
  },

  //_____ takes responsibility for their mistakes
  responsibilityRating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    default: 5,
  },

  //_____ is interested in my personal and professional development
  profDev: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    default: 5,
  },

  //I have regular 1:1s with _____
  oneToOneRating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    default: 5,
  },

  //_____ respects us all equally and doesn’t have favorites
  favoritesRating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
    default: 5,
  },

  //Could you tell us a bit about _____'s strengths?
  strengths: {
    type: String,
    required: true,
    default: 'Hard working',
  },

  //What could _____ improve on?
  weakness: {
    type: String,
    required: true,
    default: 'none',
  },

  managerEmail: {
    type: String,
    required: true,
    default: 'mariyazaveri13@gmail.com',
  },

  overAllRating: {
    type: Number,
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

module.exports = mongoose.model('Manager', ManagerSchema);

/*********
 * Tasks:
 *
 * Sort :
 * based on rating
 * name
 * case insensitive
 *
 * Search:
 * name
 * email
 * case insesitive
 *
 * filter:
 * more than over all rating
 * less than over all rating
 *
 * routes:
 * get, post, patch, delete
 *
 * make a new get route where email is entered
 * on entering the email,
 * avg of all ratings are displayed
 * highest rated is displayed from all ratings
 * needs improvement is also displayed
 */
