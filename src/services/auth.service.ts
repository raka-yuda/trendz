import axios from "axios";

const API_URL = (import.meta as any).env.VITE_TRENDZ_API_URL || "http://localhost:8090";
const API_PATH = `${API_URL}/api/auth`;

const register = (username: string, email: string, password: string) => {
  return axios.post(API_PATH + "/signup", {
    username,
    email,
    password,
  });
};

const login = async (username: string, password: string) => {
  const response = await axios
    .post(API_PATH + "/signin", {
      username,
      password,
    });
  
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;