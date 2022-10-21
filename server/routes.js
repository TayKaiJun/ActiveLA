import express from "express";

import {
    addTodo, 
    getAllTodos
} from "./controllers/todoController.js"

const apiRoutes = express.Router();

// Example routes
apiRoutes.get('/allTodo', getAllTodos);
apiRoutes.post('/addTodo', addTodo);
// ---------

export default apiRoutes;
