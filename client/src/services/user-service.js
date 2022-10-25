import http from "./http-common";

export const getUserByID = (id) => {
    http.get(`/userByID?_id=${id}`);
}

export const getUserByUsername = (username) => {
    http.get(`/userByID?username=${username}`);
}

export const createNewUser = (user) => {
    http.post(`/user`, user);
}
