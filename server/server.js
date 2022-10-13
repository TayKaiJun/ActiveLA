const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = 8080;

// ---------- Example code for 1 data model -----------
// https://medium.com/codingthesmartway-com-blog/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-2-637f337e5d61
// You can test all these endpoints with Postman https://www.postman.com/downloads/

// Should probably also move all these routes to a folder for better organisation
let Todo = require('./models/todo.model');

const todoRoutes = express.Router();

// Base path, 
app.use('/todos', todoRoutes);

// '/' endpoint sends GET request to retrieve all todos
todoRoutes.route('/').get( (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// '/:id' endpoint sends GET request to retrive todos by ID
todoRoutes.route('/:id').get( (req, res) => {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

// '/add' endpoint sends POST request to CREATE new todo object in DB
todoRoutes.route('/add').post( (req, res) => {
    let todo = new Todo(req.body); // create new Todo object
    todo.save() // save method to add new obj
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

// endpoint sends PUT request to UPDATE todo data if it exists, else add new one like above.
todoRoutes.route('/update/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send("data is not found");
        }
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

// there's probably a delete method too

// ---------------------------------------------------

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    `${MONGO_URI}`, { 
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + 8080);
});