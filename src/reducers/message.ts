import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

const messagesReducer = (state = initialState, action: Record<any, string>) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export default messagesReducer;
