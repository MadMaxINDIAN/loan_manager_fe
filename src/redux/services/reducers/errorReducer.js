import {GET_ERRORS} from "../actions/type"

const initialState ={}

export default function(state = initialState,action){
    switch (action.type){
        case GET_ERRORS : {
            if (typeof action.payload === "string") {
                return {unauthorized : "Access denied or Internal server error", key: Math.random()}
            }
            return action.payload;
    }
        default:
            return state;
    }
}