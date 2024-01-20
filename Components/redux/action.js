import {
  ADD_TO_CART,
  ADD_TO_FAV,
  CLEAR_CART,
  CLEAR_FAV,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_TO_CART,
  REMOVE_TO_FAV,
} from './constant';
// cart item
export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
}
export function removeToCart(item) {
  return {
    type: REMOVE_TO_CART,
    payload: item,
  };
}
export function incrementQuantityItem(item) {
  return {
    type: INCREMENT_QUANTITY,
    payload: item,
  };
}
export function decrementQuantityItem(item) {
  return {
    type: DECREMENT_QUANTITY,
    payload: item,
  };
}
export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

// favourite item
export function clearFav() {
  return {
    type: CLEAR_FAV,
  };
}
export function addToFav(item) {
  return {
    type: ADD_TO_FAV,
    payload: item,
  };
}
export function removeToFav(item) {
  return {
    type: REMOVE_TO_FAV,
    payload: item,
  };
}
