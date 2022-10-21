/* 
    Example code to showcase a general structure of CRUD operations with express and Mongoose.
    We do not actually use todos.
*/ 

import Todo from "../models/todo.model.js"

/*
    Gets all todos from the DB
    req -> The HTTP POST request sent to the server, in JSON format
    res -> HTTP response returned. Contains a lot of info can print out to see.
*/
export const getAllTodos = (req, res) => {
    Todo.find({}).then((allTodos) => {
        return res.status(200).json({
            success: true,
            message: "List of all todos",
            Todo: allTodos
        })
    }).catch((e) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    })
}


// Function to add a new todo that will be tied to the /add route under routes.js
export const addTodo = (req, res) => {
    
    // Create a new Todo object using the passed in req. Follow the 
    const todo = new Todo({
        todo_description: req.body.description,
        todo_responsible: req.body.responsible,
        todo_priority: req.body.priority,
        todo_completed: req.body.todo_completed
    })

    return todo.save().then((newTodo) => {
        return res.status(201).json({
            success: true,
            message: "New todo created",
            Todo: newTodo
        })
    }).catch((error) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    })
}