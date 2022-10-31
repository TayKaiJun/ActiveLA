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
    skilllevel: {
        type: String
    },
    agegroup: {
        type: String
    },
    numberofplayerslookingfor: { 
        type: String
    },
    costs: {
        type: String
    }
});

export default mongoose.model('Event', Event);