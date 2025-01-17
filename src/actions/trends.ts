import {
  SET_MESSAGE,
  FETCH_TRENDS_SUCCESS,
  FETCH_TRENDS_FAILED,
} from "./types";

import TrendsService from "../services/trends.service";
import { Dispatch } from 'redux'; 

interface ITrends {
  page?: number;
  limit?: number;
}

export const fetchTrends = ({page, limit}: ITrends) => (dispatch: Dispatch) => {
  return TrendsService.fetchTrends({page, limit}).then(
    (response) => {
      const trendsData = response?.data?.data

      dispatch({
        type: FETCH_TRENDS_SUCCESS,
        payload: trendsData,
      });

      return Promise.resolve(trendsData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_TRENDS_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};
