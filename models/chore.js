const mongoose = require("mongoose");
const { Schema } = mongoose;

const choreSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ["kitchen", "pets", "bathroom", "bedroom", "livingroom", "yard", "laundry", "other"]
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
    timeElapsed: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    submitted: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        filename: String,
    }
});

module.exports = mongoose.model("Chore", choreSchema);