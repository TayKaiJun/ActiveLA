import http from "./http-common";

export function getAllEvents() {
  return http.get(`/getAllEvents`);
}

export function addEventService(form) {
  return http.post(`/addEvent`, form);
}
