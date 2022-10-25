import express from "express";
import { 
    findUserByID,
    findUserByUsername,
    addNewUser
} from "./controllers/userController.js";
import {
    addTodo, 
    getAllTodos
} from "./controllers/todoController.js"

const apiRoutes = express.Router();

// Example routes
// A function is passed into the second param, taking in req and res as inputs
apiRoutes.get('/allTodo', getAllTodos);
apiRoutes.post('/addTodo', addTodo);
// ---------

// Routes for user model
apiRoutes.get('/userByID', findUserByID); // Query param is _id
apiRoutes.get('/userByUsername', findUserByUsername); // Query param is username
apiRoutes.post('/user', addNewUser);

export default apiRoutes;
