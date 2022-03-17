import { LOGIN } from "./type";

export const login = (user) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: user,
    });
}