import { combineReducers } from "redux";
import { cartReducer } from "./reducer/cartReducer";
import { favouriteReducer } from "./reducer/favouritereducer";
export default combineReducers({
  cart: cartReducer,
  like:favouriteReducer,
});