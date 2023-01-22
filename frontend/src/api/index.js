import axios from "axios";

export const API = axios.create({
  baseURL: "https://backend-production-4240.up.railway.app",
});
