import User from "../models/user.model.js";
import Event from "../models/event.model.js"

// TODO: Make login and signup methods that are secure 

export const findUserByUsername = async (req, res) => {
    try {
        const user = await User.find({ username: req.query.username })
        return res.status(200).json({
            success: true,
            message: "Returned user by username",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const findUserByEmail = async (req, res) => {
    try {
        const user = await User.find({ email: req.query.email })
        return res.status(200).json({
            success: true,
            message: "Returned user by email",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const data = await User.find({ email: req.query.email })
        return res.status(200).json({
            success: true,
            message: "Login successful",
            User: data
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const findUserByID = async (req, res) => {
    try {
        const user = await User.find({ _id: req.query.id })
        return res.status(200).json({
            success: true,
            message: "Returned user by ID",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const addNewUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            pronouns: req.body.pronouns,
            about: req.body.about,
            interests: req.body.interests,
            eventsHosting: [],
            eventsGoing: [],
            eventsPending: []
        })

        await user.save();

        return res.status(201).json({
            success: true,
            message: "New user added to database",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add new user to database",
            error: err.message
        })
    }
}

/* Request body = {
    uid,
    eventID
}
*/
export const requestToJoinEvent = async (req, res) => {
    try {
        const eid = req.body.event;
        const uid = req.body.uid
        // findOneAndUpdate overcomes race conditions
        const event = await Event.findOneAndUpdate(
            { _id: eid },
            { $push: { "pendingAccept": uid}}
        )
        const user = await User.findOneAndUpdate(
            { _id: uid },
            { $push: { "eventsPending": eid } }
        )
        return res.status(201).json({
            success: true,
            message: "Successfully requested to join event",
            user: user,
            event: event
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to join event",
            error: err.message
        })
    }
}



/*
    For a given UID, find all the events within that User object
    eventsHosting, eventsGoing, eventsPending
*/
export const getRelatedEvents = async (req, res) => {
    try {
        const user = (await User.find({ _id: req.query.uid }))[0];
        const eventsHosting = user.eventsHosting;
        const eventsPending = user.eventsPending;
        const eventsGoing = user.eventsGoing;

        // A bit slow but it works
        const hosting = {}
        for (let i = 0; i < eventsHosting.length; i++){
            const e = await Event.find({_id: eventsHosting[i]});
            hosting[i] = e;
        }
        const pending = {}
        for (let i = 0; i < eventsPending.length; i++){
            const e = await Event.find({_id: eventsPending[i]});
            pending[i] = e;
        }
        const going = {}
        for (let i = 0; i < eventsGoing.length; i++){
            const e = await Event.find({_id: eventsGoing[i]});
            going[i] = e;
        }
        
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all events.",
            hosting: hosting,
            pending: pending,
            going: going 
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch some event",
            error: err.message
        })
    }
}