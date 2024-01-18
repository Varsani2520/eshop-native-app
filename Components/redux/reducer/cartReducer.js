import { ADD_TO_CART } from "../constant";

const initialState = {
  cartItem: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
    default:
      return state;
  }
};