// Example model

const mongoose = require('mongoose');

// Create new mongoose schema object
const Schema = mongoose.Schema;
let Todo = new Schema({
    // List attributes model will contain
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

module.exports = mongoose.model('Todo', Todo);