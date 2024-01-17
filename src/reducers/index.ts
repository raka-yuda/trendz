import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import scrapeRequest from "./scrapeRequest";

const rootReducer = combineReducers({
  auth,
  message,
  scrapeRequest
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;