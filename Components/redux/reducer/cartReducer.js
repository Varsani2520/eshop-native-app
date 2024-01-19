import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_TO_CART,
} from '../constant';

const initialState = {
  cartItem: [],
  status: 'pending',
  count: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
        status: 'pending',
        count: state.count + 1,
      };
    case REMOVE_TO_CART:
      const updatedCart = state.cartItem.filter(
        item => item.id !== action.payload.id,
      );
      return {
        ...state,
        cartItem: updatedCart,
        status: 'pending',
        count: state.count - 1,
      };
    case INCREMENT_QUANTITY:
      if (action.payload.quantity >= 5) {
        toast.error('Limited quantity available');
        return state;
      }
      return {
        ...state,
        cartItem: state.cartItem.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
        status: 'pending',
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartItem: state.cartItem.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity - 1),
              }
            : item,
        ),
        status: 'pending',
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItem: [],
      };
    default:
      return state;
  }
};
