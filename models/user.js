const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["parent", "child"]
    },
    kids: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    parents: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    earnedRewards:[{
        type: Schema.Types.ObjectId,
        ref: "Reward"
    }]
});

module.exports = mongoose.model("User", userSchema);