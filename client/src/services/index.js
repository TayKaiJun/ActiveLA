import http from "./http-common";

// Function to get events
export default async function getAllEvents() {
  try {
    const resp = await http.get(`/getAllEvents`);
    const allEvents = resp.data.Event;
    return allEvents;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
