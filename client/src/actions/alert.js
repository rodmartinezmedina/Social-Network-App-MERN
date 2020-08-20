import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

//For beeing able to dispatch more than one action from this function
//we must use thunk
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
