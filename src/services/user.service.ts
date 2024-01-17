import axios from "axios";
import authHeader from "./auth-header";

const API_URL = (import.meta as any).env.VITE_TRENDZ_API_URL || "http://localhost:8090";
const API_PATH = `${API_URL}/api/test`;

const getPublicContent = () => {
  return axios.get(API_PATH + "all");
};

const getUserBoard = () => {
  return axios.get(API_PATH + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_PATH + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_PATH + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService;