import express from "express";
import { 
    findUserByID,
    findUserByUsername,
    findUserByEmail,
    addNewUser,
    requestToJoinEvent,
    getRelatedEvents,
    acceptJoinRequest
} from "./controllers/userController.js";

import {
    addEvent, 
    deleteEvent, 
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
apiRoutes.get('/getRelatedEvents', getRelatedEvents); // Query param is user _id
apiRoutes.get('/getInterestedUsers', getInterestedUsers); // Query param is event _id

apiRoutes.post('/acceptJoinRequest', acceptJoinRequest); // Body includes uid and eventID

apiRoutes.post('/addEvent', addEvent); // New event to be added in req body
apiRoutes.delete('/deleteEvent', deleteEvent); // Query param event _id

export default apiRoutes;
