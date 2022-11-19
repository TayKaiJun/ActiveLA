import http from "./http-common";

// Function to get events
export async function getAllEvents(filter) {
  try {
    const resp = await http.post(`/getAllEvents`, filter);
    const allEvents = resp.data.Event;
    return allEvents;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function requestToJoinEvent(uid, eventID) {
  try {
    const body = {
      'uid': uid,
      'event': eventID,
    };
    console.log(body.event);
    const resp = await http.post(`/requestToJoin`, body);
    return resp;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}
