import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_TO_CART,
} from './constant';

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
