import { SET_LOADING_FALSE, SET_LOADING_TRUE } from "../actions/type";
const initialState = {
    isLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOADING_TRUE:
            return {
                ...state,
                isLoading: true,
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}