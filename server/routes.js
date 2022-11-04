import express from "express";

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
apiRoutes.get('/allTodo', getAllTodos);
apiRoutes.post('/addTodo', addTodo);
// ---------


apiRoutes.get('/getallEvents', getAllEvents);
apiRoutes.post('/addEvent', addEvent);

export default apiRoutes;
