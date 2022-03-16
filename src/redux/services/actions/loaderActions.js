import { SET_LOADING_FALSE, SET_LOADING_TRUE } from "./type";

export const addLoader = () => dispatch => {
    dispatch({
        type: SET_LOADING_TRUE,
    });
};

export const removeLoader = () => dispatch => {
    dispatch({ type: SET_LOADING_FALSE });
}