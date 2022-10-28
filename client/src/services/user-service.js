import http from "./http-common";

export const getUserByID = (id) => {
    return http.get(`/userByID?_id=${id}`);
}

export const getUserByUsername = (username) => {
    return http.get(`/userByUsername?username=${username}`);
}

export const getUserByEmail = (email) => {
    return http.get(`/userByEmail?email=${email}`);
}

export const createNewUser = (user) => {
    return http.post(`/user`, user);
}
