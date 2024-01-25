// utils.js
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCart,
  decrementQuantityItem,
  incrementQuantityItem,
  removeToCart,
} from './Redux/action';
import ToastMessage from './ToastMessage';

const useCartActions = () => {
  const dispatch = useDispatch();

  const carts = useSelector(state => state.cart.cartItem);
  const user = useSelector(state => (state.user.message = 'true'));

  const handleRemoveToCart = item => {
    dispatch(removeToCart(item));
  };

  const handleIncrement = item => {
    dispatch(incrementQuantityItem(item));
  };

  const handleDecrement = item => {
    dispatch(decrementQuantityItem(item));
  };

  const handlePayment = () => {
    <ToastMessage message={'Payment successful'} />;
    // router.push('/pages/address');
    dispatch(clearCart());
  };
  return {
    handleRemoveToCart,
    handleIncrement,
    handleDecrement,
    carts,
    user,
    handlePayment,
  };
};

export default useCartActions;
