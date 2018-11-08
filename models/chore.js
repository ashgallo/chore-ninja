const mongoose = require("mongoose");
const { Schema } = mongoose;


const choreSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ["kitchen", "pets", "bathroom", "bedroom", "livingroom", "yard", "laundry", "other"]
    },
    name: {
        type: string, 
        required: true
    },
    startedAt: Date,
    completed: Boolean,
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    submittedAt: Date,
    submitted: Boolean,
    points: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Chore", choreSchema);