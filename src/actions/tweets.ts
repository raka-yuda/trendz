import {
  SET_MESSAGE,
  FETCH_TWEETS_SUCCESS,
  FETCH_TWEETS_FAILED,
  FETCH_TWEETS_CHART_SENTIMENT_SUCCESS,
  FETCH_TWEETS_CHART_SENTIMENT_FAILED,
  FETCH_TWEETS_CHART_TRENDS_SUCCESS,
  FETCH_TWEETS_CHART_TRENDS_FAILED,
  FETCH_TWEETS_CHART_SCRAPE_SENTIMENT_SUCCESS,
  FETCH_TWEETS_CHART_SCRAPE_SENTIMENT_FAILED,
} from "./types";

import TweetsService from "../services/tweets.service";
import { Dispatch } from 'redux'; 

interface ITweets {
  page?: number;
  limit?: number;
}

interface IFetchTweetsChart {
  type?: 'GROUPING_BY_SENTIMENT' | 'COUNT_TRENDING_TOPIC_APPEARANCES' | 'COUNT_SCRAPE_SENTIMENT_PER_DAY';
  requestId?: string;
  requestDate?: string;
}

export const fetchTweets = ({page, limit}: ITweets) => (dispatch: Dispatch) => {
  return TweetsService.fetchTweets({page, limit}).then(
    (response) => {
      const tweetsData = response?.data?.data

      dispatch({
        type: FETCH_TWEETS_SUCCESS,
        payload: tweetsData,
      });

      return Promise.resolve(tweetsData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TWEETS_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const fetchTweetsChartSentiment = ({requestId, type = 'GROUPING_BY_SENTIMENT'}: IFetchTweetsChart) => (dispatch: Dispatch) => {
  return TweetsService.fetchTweetsChart({requestId, type}).then(
    (response) => {
      const tweetChartData = response?.data?.data

      dispatch({
        type: FETCH_TWEETS_CHART_SENTIMENT_SUCCESS,
        payload: tweetChartData,
      });

      return Promise.resolve(tweetChartData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TWEETS_CHART_SENTIMENT_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const fetchTweetsChartTrends = ({requestDate, type = 'COUNT_TRENDING_TOPIC_APPEARANCES'}: IFetchTweetsChart) => (dispatch: Dispatch) => {
  return TweetsService.fetchTweetsChart({requestDate, type}).then(
    (response) => {
      const tweetChartData = response?.data

      dispatch({
        type: FETCH_TWEETS_CHART_TRENDS_SUCCESS,
        payload: tweetChartData,
      });

      return Promise.resolve(tweetChartData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TWEETS_CHART_TRENDS_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const fetchTweetsChartScrapeSentiment = ({requestDate, type = 'COUNT_SCRAPE_SENTIMENT_PER_DAY'}: IFetchTweetsChart) => (dispatch: Dispatch) => {
  return TweetsService.fetchTweetsChart({requestDate, type}).then(
    (response) => {
      const tweetChartData = response?.data

      dispatch({
        type: FETCH_TWEETS_CHART_SCRAPE_SENTIMENT_SUCCESS,
        payload: tweetChartData,
      });

      return Promise.resolve(tweetChartData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TWEETS_CHART_SCRAPE_SENTIMENT_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};
