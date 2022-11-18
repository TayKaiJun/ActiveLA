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
      "uid": uid,
      "event": eventID
    }
    const resp = await http.post(`/requestToJoin`, body);
    return resp;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export async function getRelatedEvents(uid) {
  try {
    const resp = await http.get(`/getRelatedEvents?uid=${uid}`);
    return resp;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}