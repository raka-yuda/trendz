import { SET_MESSAGE, CLEAR_MESSAGE, FETCH_SCRAPE_REQUEST_SUCCESS, FETCH_SCRAPE_REQUEST_FAILED } from "../actions/types";

const initialState: ScrapeRequestData = {
  scrapeRequest: null,
  isFetched: false
};

interface ScrapeRequest {
  created_at: string | null;
  id: number | null;
  tweets_limit: number | null;
  topic_id: number | null;
  status: string | null;
  last_running: string | null;
  query: string | null;
  metadata: string | null;
  updated_at: string | null;
}

interface ScrapeRequestData {
  scrapeRequest: ScrapeRequest[] | null;
  isFetched: false;
}

const scrapeRequest = (state = initialState, action: Record<any, string>) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SCRAPE_REQUEST_SUCCESS:
      return { 
        ...state,
        scrapeRequest: payload,
        isFetched: true
      };

    case FETCH_SCRAPE_REQUEST_FAILED:
      return { 
        ...state,
        isFetched: false
      };

    default:
      return state;
  }
}

export default scrapeRequest;
