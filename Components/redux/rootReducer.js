import {combineReducers} from 'redux';
import {cartReducer} from './reducer/cartReducer';
import {favouriteReducer} from './reducer/favouritereducer';
import authReducer from './reducer/AuthReducer';
export default combineReducers({
  cart: cartReducer,
  like: favouriteReducer,
  user: authReducer,
});
