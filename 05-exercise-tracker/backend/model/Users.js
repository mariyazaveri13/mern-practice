const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        minLength:[3,'User Name should be at least 3 characters long'],
        required:true,
        trim:true,
        index: true,
        unique:true,
        match:[/^[a-zA-Z]*$/,'Please enter valid user names'],
        immutable:true
    },
    name:{
        type:String,
        trim:true,
        minLength:[3,'Please enter bigger than 3 characters'],
        match:[/^[a-zA-Z ]*$/,'Only alphabets are allowed in name'],
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    weight:{
        type:Number,
        match:[/^[0-9]\d*$/,'Come on bro enter a number you know'],
        required:[true,"So you so ashamed of your weight that you won't enter it eh?? Go on now don't be shy."]
    },
    birthDate:{
        type:Date,
        // required:true
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

module.exports = mongoose.model('User',UserSchema)