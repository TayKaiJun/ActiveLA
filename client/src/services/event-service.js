import http from "./http-common";

export default function getAllEvents() {
    return http.get(`/getAllEvents`);
}

