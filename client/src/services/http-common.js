import axios from "axios";

/*
  Axios instance where we will call HTTP methods from.
  Import into service file before writing request functions.
*/
const http = () => axios.create({
  baseURL: "http://localhost:8080/api", // Base URL for all our API endpoints
  headers: {
    "Content-type": "application/json"
  }
});

export default http;