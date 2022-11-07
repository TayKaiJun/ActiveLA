import express from "express";
import { 
    findUserByID,
    findUserByUsername,
    findUserByEmail,
    addNewUser
} from "./controllers/userController.js";
import {
    addTodo, 
    getAllTodos
} from "./controllers/todoController.js"

import {
    addEvent, 
    getAllEvents
} from "./controllers/eventController.js"

const apiRoutes = express.Router();

// Example routes
// A function is passed into the second param, taking in req and res as inputs
apiRoutes.get('/allTodo', getAllTodos);
apiRoutes.post('/addTodo', addTodo);
// ---------

// Routes for user model
apiRoutes.get('/userByID', findUserByID); // Query param is _id
apiRoutes.get('/userByUsername', findUserByUsername); // Query param is username
apiRoutes.get('/userByEmail', findUserByEmail); // Query param is email
apiRoutes.post('/user', addNewUser);

apiRoutes.post('/getallEvents', getAllEvents);
apiRoutes.post('/addEvent', addEvent);

export default apiRoutes;
