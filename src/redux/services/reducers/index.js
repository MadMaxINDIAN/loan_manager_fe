// libraries
import { combineReducers } from "redux";

// import reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingStateReducer";

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    loading : loadingReducer
})