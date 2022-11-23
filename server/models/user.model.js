// Model definition of a User

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  // List attributes model will contain
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pronouns: {
    type: String,
  },
  about: {
    type: String,
  },
  interests: [
    {
      sport: String,
      level: Number, // Proficiency at the sport, 1 being lowest 5 being highest
    },
  ],
  eventsHosting: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  eventsGoing: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  eventsPending: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

User.index({
  username: "text",
  name: "text",
});

export default mongoose.model("User", User);
