import express from "express";
import { 
    findUserByID,
    findUserByUsername,
    findUserByEmail,
    addNewUser,
    requestToJoinEvent
} from "./controllers/userController.js";

import {
    addEvent, 
    getAllEvents
} from "./controllers/eventController.js"

const apiRoutes = express.Router();

apiRoutes.get('/userByID', findUserByID); // Query param is _id
apiRoutes.get('/userByUsername', findUserByUsername); // Query param is username
apiRoutes.get('/userByEmail', findUserByEmail); // Query param is email
apiRoutes.post('/user', addNewUser);

apiRoutes.post('/requestToJoin', requestToJoinEvent) // Body includes uid and eventID

apiRoutes.post('/getallEvents', getAllEvents);
apiRoutes.post('/addEvent', addEvent);

export default apiRoutes;
