import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  //we wanna hit GET api/profile/me with whatever user is logged in user:req.user.id
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // we have error in the state. we get the error message text
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
