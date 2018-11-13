const mongoose = require("mongoose");
const { Schema } = mongoose;

const rewardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number, 
        required: true
    },
    restrictedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
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

module.exports = mongoose.model("Reward", rewardSchema);