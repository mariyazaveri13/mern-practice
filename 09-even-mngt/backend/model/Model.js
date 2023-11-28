// models/Event.js

const mongoose = require('mongoose');

/*Seeder
{
  "title": "Tech Conference",
  "description": "'An annual technology conference.'",
  "date": "2023-01-15T09:00:00Z",
  "location": "City Convention Center",
  "attendees": [
    { "name": "John Doe", "feedback": "Great event!" },
    { "name": "Jane Smith", "feedback": "Informative sessions." }
  ]
}
*/

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match:/^[a-zA-Z ]*$/
  },
  feedback: {
    type: String,
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    validate:{
      validator:function(value){
        console.log('inside validator')
        let res =  value >= new Date()
        console.log(res,'res')
        return res
      },
      message:'Date must be greater than today'
    }
    // required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendees: [attendeeSchema],
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }

},{ cascade: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
