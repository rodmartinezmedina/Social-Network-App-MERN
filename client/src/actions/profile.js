import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS,
} from "./types";

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
    // dispatch({ type: CLEAR_PROFILE });

    dispatch({
      // type: NO_REPOS,
      type: PROFILE_ERROR,
      // we have error in the state. we get the error message text
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
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

//Get Profile by ID (by userID not by profile Id )
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

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

//Get Githubrepos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
      // type: PROFILE_ERROR,
      // // we have error in the state. we get the error message text
      // payload: {
      //   msg: err.response.statusText,
      //   status: err.response.status,
      // },
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

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to DELETE THIS EXPERIENCE? "
    )
  ) {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to DELETE THIS EDUCATION? "
    )
  ) {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }}
};

//Delete account & profile
export const deleteAccount = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to DELETE YOUR ACCOUNT? This can NOT be undone"
    )
  ) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Your acount has been permanently deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
