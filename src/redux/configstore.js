import {
  createContext,
  combineReducers,
  applyMiddleware,
  createStore,
} from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import nemo from "./modules/nemo";

export const history = createBrowserHistory();
const middleweares = [thunk];
const enhancer = applyMiddleware(...middleweares);
const rootReducer = combineReducers({ nemo });

const store = createStore(rootReducer, enhancer);

export default store;
