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
      host: "current user",
      pendingAccept: [],
      attending: []
    }); 

    await event.save();
    return res.status(201).json({
      success: true,
      message: "New event created",
      Event: newEvent,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message,
    });
  }
};
