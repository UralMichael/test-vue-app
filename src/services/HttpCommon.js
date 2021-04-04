import Axios from "axios";
import { mockUpClient } from "@/mock-server/server";

export const BASE_URL = "http://localhost:3000";
export const USERS_URL = "/api/users";

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

mockUpClient(axiosInstance);

export const HttpClient = axiosInstance;
