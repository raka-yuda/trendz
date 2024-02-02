import axios from "axios";
import authHeader from "./auth-header";

interface IFetchScrapeRequests {
  topicId?: number;
  page?: number;
  limit?: number;
}

const API_URL = (import.meta as any).env.VITE_TRENDZ_API_URL || "http://localhost:8090";
const API_PATH = `${API_URL}/api/scrape-request`;


const fetchScrapeRequests = ({page = 1, limit = 10, topicId}: IFetchScrapeRequests) => {
  return axios.get(API_PATH, {
    params: {
      topicId,
      page,
      limit,
    }
  });
};

const postScrapeRequests = ({
  topicId,
  query,
  tweetsLimit = 10,
  status = 'IN_QUEUE',
}) => {
  return axios.post(API_PATH, {
    topic_id: topicId,
    tweets_limit: tweetsLimit,
    status: status,
    query: query,
  }, {
    headers: authHeader()
  });
};

const scrapeRequestService = {
  fetchScrapeRequests,
  postScrapeRequests
};

export default scrapeRequestService;