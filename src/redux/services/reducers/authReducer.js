import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SOCKET_CONNECTION_ERROR,
    UPDATE_PROFILE
  } from "../actions/type";
  
  const initialState = {
    isAuthenticated: false,
    user: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isAuthenticated: false,
          user: {},
        };
      case LOGOUT_SUCCESS:
        return initialState;
      case UPDATE_PROFILE:
        return {
          ...state,
          user: {
            ...state.user,
            user: action.payload,
          }
        }
      default:
        return state;
    }
  }