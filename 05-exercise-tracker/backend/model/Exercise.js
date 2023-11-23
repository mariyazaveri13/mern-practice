const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({

    userName:{
        required:true,
        type:String,
        trim:true,
        immutable:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true,
    },
    type:{
        type:[String],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

})
module.exports = mongoose.model('Exercise',ExerciseSchema)