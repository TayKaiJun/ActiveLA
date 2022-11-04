/* 
    Example code to showcase a general structure of CRUD operations with express and Mongoose.
    We do not actually use events.
*/ 

import Event from "../models/event.model.js"


/*
    Gets all events from the DB
    req -> The HTTP POST request sent to the server, in JSON format
    res -> HTTP response returned. Contains a lot of info can print out to see.
*/

export const getAllEvents = (req, res) => {
    Event.find({}).then((allEvents) => {
        return res.status(200).json({
            success: true,
            message: "List of all events",
            Event: allEvents
        })
    }).catch((error) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    })
}

// export const getAllEvents = (req, res) => {
//     Event.find({}).then((allEvents) => {
//         return res.status(200).json({
//             success: true,
//             message: "List of all events",
//             Event: allEvents
//         })
//     }).catch((error) => {
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: err.message
//         })
//     })
// }


// Function to add a new event that will be tied to the /add route under routes.js
export const addEvent = (req, res) => {
    
    // Create a new event object using the passed in req. Follow the 
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        skilllevel: req.body.skilllevel,
        agegroup: req.body.agegroup,
        numberofplayerslookingfor: req.body.numberofplayerslookingfor,
        costs: req.body.costs,
    })

    return event.save().then((newEvent) => {
        return res.status(201).json({
            success: true,
            message: "New event created",
            Event: newEvent
        })
    }).catch((error) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        })
    })
}