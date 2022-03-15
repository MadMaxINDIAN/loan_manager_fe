import { SET_LOADING_FALSE } from "./type";

export const removeLoader = () => dispatch => {
    dispatch({ type: SET_LOADING_FALSE });
}