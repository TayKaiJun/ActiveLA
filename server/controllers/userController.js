import User from "../models/user.model.js";
import Event from "../models/event.model.js"

// TODO: Make login and signup methods that are secure 

export const findUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username })
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
        const user = await User.findOne({ email: req.query.email })
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
        const user = await User.findOne({ _id: req.query._id })
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
        await Event.findOneAndUpdate(
            { _id: eid },
            { $push: { "pendingAccept": uid } }
        )
        await User.findOneAndUpdate(
            { _id: uid },
            { $push: { "eventsPending": eid } }
        )
        return res.status(201).json({
            success: true,
            message: "Successfully requested to join event",
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
  For a given EventID of a hosted event and a UID of a requesting user, 
  update Event model with ID of new attendee,
  update User model with ID of new going event

  Request body = {
    uid,
    eventID
  }
*/
export const acceptJoinRequest = async (req, res) => {
    try {
        const eid = req.body.eventID;
        const uid = req.body.uid;

        await Event.findOneAndUpdate(
            { _id: eid },
            {
                $push: { "attending": uid },
                $pull: { "pendingAccept": uid }
            }
        )
        await User.findOneAndUpdate(
            { _id: uid },
            {
                $push: { "eventsGoing": eid },
                $pull: { "eventsPending": eid }
            }
        )
        return res.status(201).json({
            success: true,
            message: "Successfully accepted a join request",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch some event",
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
        const hosting = []
        for (let i = 0; i < eventsHosting.length; i++) {
            const e = await Event.findOne({ _id: eventsHosting[i] }).populate({
                path: "host",
                select: "name -_id",
              });
            hosting.push(e);
        }
        const pending = []
        for (let i = 0; i < eventsPending.length; i++) {
            const e = await Event.findOne({ _id: eventsPending[i] }).populate({
                path: "host",
                select: "name -_id",
              });
            pending.push(e);
        }
        const going = []
        for (let i = 0; i < eventsGoing.length; i++) {
            const e = await Event.findOne({ _id: eventsGoing[i] }).populate({
                path: "host",
                select: "name -_id",
              });
            going.push(e);
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

// Query param as user _id
// Request body as updated event
export const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
        req.query._id, 
        { $set: req.body }
        )
        return res.status(201).json({
        success: true,
        message: "Successfully updated user.",
        user: req.body
        })
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: err.message,
        });
    }
}

// Pass in event ID
export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.query._id);
      return res.status(202).json({
        success: true,
        message: "Successfully deleted user"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
        err: err.message,
      });
    }
  }