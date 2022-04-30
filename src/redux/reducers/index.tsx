import { combineReducers } from "redux";
import { configReducer } from "./config-reducer";
import { productsReducer } from "./product-reducer";
import { userReducer } from "./user-reducer";

const reducers = combineReducers({
  user: userReducer,
  config: configReducer,
  products: productsReducer
});

export default reducers;