// Example model for a Todo object

import mongoose from "mongoose";

// Create new mongoose schema object
const Schema = mongoose.Schema;
let Todo = new Schema({
    // List attributes model will contain. They will correspond to attribute name in MongoDB
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

export default mongoose.model('Todo', Todo);