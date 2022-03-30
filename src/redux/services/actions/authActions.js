import { LOGIN } from "./type";

export const login = (token) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: token,
  });
};
