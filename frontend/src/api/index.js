import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "http://localhost:3000/"
export const API = axios.create({baseURL:"https://backend-production-4240.up.railway.app/"});
