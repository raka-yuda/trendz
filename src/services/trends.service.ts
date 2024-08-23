import axios from "axios";

interface IFetchTrends {
  page?: number;
  limit?: number;
}

const API_URL = (import.meta as any).env.VITE_TRENDZ_API_URL || "http://localhost:8090";
const API_PATH = `${API_URL}/trends`;

const fetchTrends = ({page = 1, limit = 10}: IFetchTrends) => {
  return axios.get(API_PATH, {
    params: {
      page,
      limit,
    }
  });
};

const trendsService = {
  fetchTrends
};

export default trendsService;