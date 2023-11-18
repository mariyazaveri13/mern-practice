const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  industry: {
    type: String,
    default: 'Wooohooo',
  },
  //Tell us about the main turning points in the history of your business
  turningPoints: {
    type: String,
    default: 'blabla blalllalal',
  },
  //Who are your main competitors?
  competitors: {
    type: [String],
    required: true,
    default: 'Google,amazon,fb, idk many more',
  },
  //And to finish this section, what sets your business apart from the competition?
  usp: {
    type: String,
    required: true,
  },
  //What are you branding?
  typeOfBranding: {
    type: String,
    required: true,
    enum: ['Company', 'Product', 'Service'],
  },
  //What's your brand name?
  brandName: {
    type: String,
    required: true,
  },
  //And where can we find your website, if you have one?
  url: {
    type: String,
  },
  //Could you share your brand mission?
  brandMission: {
    type: String,
    required: true,
  },
  //If your brand were a person, which of the following word groups would best describe them?
  brandPersona: {
    type: String,
    required: true,
    default: 'Exciting',
    enum: ['Sincere', 'Exciting', 'Competent', 'Sophisticated'],
  },
  //And which of the following designs would best suit your brand?
  designPersona: {
    type: [String],
    required: true,
    default: 'Techy',
    enum: [
      'Techy',
      'Illustrative',
      'Product based',
      'Flashy',
      'Photography based',
      'Minimalist',
    ],
  },
  //So, how old is your target demographic?
  demographic: {
    type: Number,
    required: true,
  },

  //And what's their average household income over 12 months?
  demoIncome: {
    type: Number,
    required: true,
  },

  //How do they find and learn about your brand?
  howDidTheyFindYou: {
    type: [String],
    required: true,
    enum: [
      'Store',
      'Website',
      'Social media',
      'Rating and review',
      'Advertizing',
      'Emails',
      'Events',
    ],
  },
  //What's your budget for this project?
  budget: {
    type: Number,
    required: true,
  },
  //And which services are you most interested in?
  services: {
    type: [String],
    required: true,
    enum: [
      'Brand design',
      'Web design',
      'App development',
      'Illustration',
      'Merchandising',
      'Package Design',
    ],
  },
  //And do you have a deadline in mind?
  deadline: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Brand', BrandSchema);

/****
 * Create a get post delete patch route
 *
 * in post and patch route competitors should be an array
 * design persona - array
 * how did they find you - array
 * services - array
 *
 * sort
 * type of branding
 * demo income
 *
 * filter
 * demo income
 * date
 *
 * aggregate:
 * design personas,
 * how did they find you
 * services
 *
 * mention total counts of each like numbers of options
 *
 *
 */
