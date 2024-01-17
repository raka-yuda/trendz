import { FETCH_TRENDS_SUCCESS, FETCH_TRENDS_FAILED } from "../actions/types";

const initialState: TrendsData = {
  trends: null,
  isFetched: false
};

interface Trends {
  id: number | null;
  topic: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface TrendsData {
  trends: Trends[] | null;
  isFetched: false;
}

const trends = (state = initialState, action: Record<any, string>) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TRENDS_SUCCESS:
      return { 
        ...state,
        trends: payload,
        isFetched: true
      };

    case FETCH_TRENDS_FAILED:
      return { 
        ...state,
        isFetched: false
      };

    default:
      return state;
  }
}

export default trends;
