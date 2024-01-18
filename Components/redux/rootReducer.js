import { combineReducers } from "redux";
import { cartReducer } from "./reducer/cartReducer";
export default combineReducers({
  cart: cartReducer,
});