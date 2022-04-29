import { combineReducers } from "redux";
import { configReducer } from "./config-reducer";
import { userReducer } from "./user-reducer";

const reducers = combineReducers({
  user: userReducer,
  config: configReducer
});

export default reducers;