// Example model for a Todo object

import mongoose from "mongoose";

// Create new mongoose schema object
const Schema = mongoose.Schema;
let Event = new Schema({
    // List attributes model will contain. They will correspond to attribute name in MongoDB
    name: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    ageGroup: {
        type: String
    },
    playerNumber: {
        type: String
    },
    costs: {
        type: String
    },
    skillLevel: {
        type: String
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pendingAccept: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    attending: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model('Event', Event);