import {
  SET_MESSAGE,
  FETCH_SCRAPE_REQUEST_FAILED,
  FETCH_SCRAPE_REQUEST_SUCCESS,
} from "./types";

import ScrapeRequestService from "../services/scrape-request.service";
import { Dispatch } from 'redux'; 

interface IFetchScrapeRequests {
  topicId?: number;
  page?: number;
  limit?: number;
  status?: string;
}

export const fetchScrapeRequests = ({
  topicId, 
  page, 
  limit,
  status
}: IFetchScrapeRequests) => (dispatch: Dispatch) => {
  return ScrapeRequestService.fetchScrapeRequests({
    topicId, 
    page, 
    limit,
    status
  }).then(
    (response) => {
      const scrapeRequestData = response?.data?.data

      dispatch({
        type: FETCH_SCRAPE_REQUEST_SUCCESS,
        payload: scrapeRequestData,
      });

      return Promise.resolve(scrapeRequestData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_SCRAPE_REQUEST_FAILED,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};
