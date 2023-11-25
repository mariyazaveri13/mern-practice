const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        match: [/^[a-zA-Z ]*$/, "Please Enter only Alphabets"],
        minLength: 3
    },

    description: {
        type: String,
        required: true,
        minLength: 3
    },

    status: {
        type: Boolean,
        required: true,
        default: false
    },
    expectedHours: {
        type: Number,
        required: true,
        min: 0
    },
    due_date: {
        type: Date,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model("Tasks", TaskSchema);
