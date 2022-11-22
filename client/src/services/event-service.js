import http from "./http-common";


export default function addEventService(form) {

    return http.post(`/addEvent`, form);
  }
  