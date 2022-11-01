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


apiRoutes.get('/allEvents', getAllEvents);
apiRoutes.post('/addEvent', addEvent);

export default apiRoutes;
