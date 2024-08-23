import axios from "axios";

interface IFetchTweets {
  page?: number;
  limit?: number;
}

interface IFetchTweetsChart {
  type?: 'GROUPING_BY_SENTIMENT' | 'COUNT_TRENDING_TOPIC_APPEARANCES' | 'COUNT_SCRAPE_SENTIMENT_PER_DAY' | 'DASHBOARD_DATA';
  requestId?: string;
  requestDate?: string;
}

const API_URL = (import.meta as any).env.VITE_TRENDZ_API_URL || "http://localhost:8090";
const API_PATH = `${API_URL}/tweets`;

const fetchTweets = ({page = 1, limit = 10}: IFetchTweets) => {
  return axios.get(API_PATH, {
    params: {
      page,
      limit,
    }
  });
};

const fetchTweetsChart = ({type, requestId, requestDate}: IFetchTweetsChart) => {
  return axios.get(`${API_PATH}/chart`, {
    params: {
      type,
      requestId,
      requestDate
    }
  });
};

const tweetsService = {
  fetchTweets,
  fetchTweetsChart
};

export default tweetsService;