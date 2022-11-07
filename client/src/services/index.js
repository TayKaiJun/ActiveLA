import http from "./http-common";

// Function to get events
export default async function getAllEvents(filter) {
  try {
    const resp = await http.post(`/getAllEvents`, filter);
    const allEvents = resp.data.Event;
    return allEvents;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
