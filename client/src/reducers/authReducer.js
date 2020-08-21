import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";

//initialState is created so we dont have to pass each parameter
//down in the export default function.
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  //loading: to make sure that the request to backend for getting user is done
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      //clears the auth state and clears the token from localStorage
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
