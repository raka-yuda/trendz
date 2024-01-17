import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

interface User {
  username: string; // Define the properties of the user object here
  roles: string[];// Add any other properties that are part of the user object
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const userString = localStorage.getItem("user");
const user: User | null = userString ? JSON.parse(userString) : null;

const initialState: AuthState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

type AuthAction = {
  type: string;
  payload: { user: User };
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
