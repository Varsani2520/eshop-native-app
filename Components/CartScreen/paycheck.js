import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {summaryServices} from '../../services/SummaryService';
import {clearCart} from '../Redux/action';
import StripeCheckout from 'react-native-stripe-checkout-webview';
const Paycheck = ({total, onPaymentSuccess}) => {
  const carts = useSelector(state => state.cart.cartItems);
  const tokens = useSelector(state => state.user.authUser.data);
  const date = new Date();
  const dispatch = useDispatch();

  async function paymentSuccess() {
    try {
      const response = await summaryServices(tokens, carts, 'pending', date);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const onToken = async token => {
    console.log('payment', carts);
    dispatch(clearCart());
    onPaymentSuccess(token);
    paymentSuccess();
  };

  return (
    <StripeCheckout
      key={process.env.KEY}
      label="Payment"
      name="eRequirement"
      description={`Your total is ${total}`}
      amount={total * 100}
      panelLabel="payment"
      token={onToken}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
    />
    
  );
};

export default Paycheck;
