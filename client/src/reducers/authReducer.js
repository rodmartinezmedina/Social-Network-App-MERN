import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

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
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
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
