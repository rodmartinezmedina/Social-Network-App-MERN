import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

//Load User
//This checks the first time the user loads. Added the same on App.js main component
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      //the response/payload is the user and we send it to the action type user_loadaed
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  // dispatch(loadUser());
};

//Register user action
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      //the data we get back in this case is the token
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //getting array of errors from the backend
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
      //we dont need payload as register_fail in auth reducer does not give back anything
    });
  }
};

//Every time the main App component is loaded we should:
// take the token we have stored
// send it to backend for validation. Hitting GET api/auth
// then load the user
// (remember json web tokens are stateless)
