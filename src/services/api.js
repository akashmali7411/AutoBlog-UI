import axios from "axios";


const API = axios.create({
  baseURL: "https://localhost:7101/api"
});

export default API;