import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './rootReducers';

let middleware = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;