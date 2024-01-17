import { FETCH_TWEETS_SUCCESS, FETCH_TWEETS_FAILED, FETCH_TWEETS_CHART_SENTIMENT_SUCCESS, FETCH_TWEETS_CHART_SENTIMENT_FAILED, FETCH_TWEETS_CHART_TRENDS_SUCCESS, FETCH_TWEETS_CHART_TRENDS_FAILED } from "../actions/types";

const initialState: TweetsData = {
  tweets: null,
  isFetched: false,
  tweetChartSentiment: {},
  isTweetChartSentimentFetched: false,
  tweetChartTrends: {},
  isTweetChartTrends: false,
};

interface Tweet {
  id: number | null;
  topic_id: number | null;
  topic_scrape_request_id: number | null;
  tweet: string | null;
  sentiment: string | null;
  metadata: Record<string, any> | null;
  created_at: string | null;
  updated_at: string | null;
}

interface TweetsData {
  tweets: Tweet[] | null;
  isFetched: boolean;
  tweetChartSentiment: any;
  isTweetChartSentimentFetched: boolean;
  tweetChartTrends: any;
  isTweetChartTrends: boolean;
}

const tweets = (state = initialState, action: Record<any, string>) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TWEETS_SUCCESS:
      return { 
        ...state,
        tweets: payload,
        isFetched: true
      };

    case FETCH_TWEETS_FAILED:
      return { 
        ...state,
        isFetched: false
      };

    case FETCH_TWEETS_CHART_SENTIMENT_SUCCESS:
      return { 
        ...state,
        tweetChartSentiment: payload,
        isTweetChartSentimentFetched: true
      };

    case FETCH_TWEETS_CHART_SENTIMENT_FAILED:
      return { 
        ...state,
        isTweetChartSentimentFetched: false
      };

    case FETCH_TWEETS_CHART_TRENDS_SUCCESS:
      return { 
        ...state,
        tweetChartSentiment: payload,
        isTweetChartTrends: true
      };

    case FETCH_TWEETS_CHART_TRENDS_FAILED:
      return { 
        ...state,
        isTweetChartTrends: false
      };

    default:
      return state;
  }
}

export default tweets;
