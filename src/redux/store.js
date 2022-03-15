// importing libraries for redux store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './services/reducers';
import StateLoader from "../utils/stateLoader";

const stateLoader = new StateLoader();
const initialState = stateLoader.loadState() || {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
);

store.subscribe(() => {
    // this is just a function that saves state to localStorage
    stateLoader.saveState(store.getState());
}); 

export default store;