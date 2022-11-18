import express from "express";
import { 
    findUserByID,
    findUserByUsername,
    findUserByEmail,
    addNewUser,
    requestToJoinEvent,
    getRelatedEvents
} from "./controllers/userController.js";

import {
    addEvent, 
    getAllEvents,
    getInterestedUsers
} from "./controllers/eventController.js"

const apiRoutes = express.Router();

apiRoutes.get('/userByID', findUserByID); // Query param is _id
apiRoutes.get('/userByUsername', findUserByUsername); // Query param is username
apiRoutes.get('/userByEmail', findUserByEmail); // Query param is email
apiRoutes.post('/user', addNewUser);

apiRoutes.post('/requestToJoin', requestToJoinEvent) // Body includes uid and eventID

apiRoutes.post('/getallEvents', getAllEvents);
apiRoutes.get('/getRelatedEvents', getRelatedEvents);
apiRoutes.get('/getInterestedUsers', getInterestedUsers);

apiRoutes.post('/addEvent', addEvent);

export default apiRoutes;
