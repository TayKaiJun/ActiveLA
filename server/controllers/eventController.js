import User from "../models/user.model.js";
import Event from "../models/event.model.js"

/*
    Gets all events from the DB
    req -> The HTTP POST request sent to the server, in JSON format
    res -> HTTP response returned. Contains a lot of info can print out to see.
*/
export const getAllEvents = async (req, res) => {
  const filter = req.body;
  console.log(filter)

  try {
    const data = await Event.find({});
    return res.status(200).json({
      success: true,
      message: "List of all events",
      Event: data,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Function to add a new event that will be tied to the /add route under routes.js
export const addEvent = async (req, res) => {
  // Create a new event object using the passed in req. Follow the
  try {
    const event = new Event({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      ageGroup: req.body.ageGroup,
      playerNumber: req.body.playerNumber,
      costs: req.body.costs,
      skillLevel: req.body.skillLevel,
      host: req.body.currentUser,
      pendingAccept: [],
      attending: []
    });

    await event.save();
    return res.status(201).json({
      success: true,
      message: "New event created",
      Event: event,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message,
    });
  }
};

/*
  For a given EventID of an event the current user is hosting, 
  find all the users that request to join that event.
*/
export const getInterestedUsers = async (req, res) => {
  try {
    const event = (await Event.find({ _id: req.query.eid }))[0];
    const pendingAccept = event.pendingAccept;
    const attendees = event.attending;

    const pending = {}
    for (let i = 0; i < pendingAccept.length; i++) {
      const user = await User.find({ _id: pendingAccept[i] });
      pending[i] = user;
    }
    const attending = {}
    for (let i = 0; i < attendees.length; i++) {
      const user = await User.find({ _id: attendees[i] });
      attending[i] = user;
    }

    return res.status(201).json({
      success: true,
      message: "Successfully returned pending and attending users",
      pending: pending,
      attending: attending
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message,
    });
  }
}

// Pass in event ID
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.query._id);
    return res.status(202).json({
      success: true,
      message: "Successfully deleted event"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
      err: err.message,
    });
  }
}

// Query param as event _id
// Request body as updated event
export const updateEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(
      req.query._id, 
      { $set: req.body }
    )
    return res.status(201).json({
      success: true,
      message: "Successfully updated event.",
      event: req.body
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: err.message,
    });
  }
}