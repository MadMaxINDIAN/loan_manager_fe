import { LOGIN } from "./type";

export const login = (data) => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: { token: data.token, user: data.user },
  });
};
