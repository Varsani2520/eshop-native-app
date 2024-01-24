import {PAYMENT_DETAIL} from '../constant';

const initialState = {
  paymentDetails: null,
};
export const SET_PAYMENT_DETAILS = 'setPayment';
export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_DETAIL:
      return {
        ...state,
        paymentDetails: action.payload,
      };

    default:
      return state;
  }
};
