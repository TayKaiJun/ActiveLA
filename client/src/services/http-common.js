import axios from "axios";

/*
  Axios instance where we will call HTTP methods from.
  Import into service file before writing request functions.
*/
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});