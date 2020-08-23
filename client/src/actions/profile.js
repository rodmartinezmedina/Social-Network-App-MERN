import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

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

//Create or update a profile
//history object has method push that redirects us to a client side route
//to know if we are creating or updating we set a parameter edit(false by default)
//we could also create 2 different funcs to create and update
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    //config always because we are sending data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //post request to /api/profile
    const res = await axios.post("/api/profile", formData, config);

    //payload will be the res.data that will actually be the profile
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    //For redirecting in an action we cant do it with the Redirect component
    // So we have to pass it the history object that has the push method on it
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//
//Add Experience
//
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    //config always because we are sending data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    //payload will be the res.data that will actually be the profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));

    //For redirecting in an action we cant do it with the Redirect component
    // So we have to pass it the history object that has the push method on it
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//
//Add Education
//
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    //config always because we are sending data
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    //payload will be the res.data that will actually be the profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));

    //For redirecting in an action we cant do it with the Redirect component
    // So we have to pass it the history object that has the push method on it
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
