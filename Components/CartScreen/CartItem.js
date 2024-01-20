import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';
import {
  decrementQuantityItem,
  incrementQuantityItem,
  removeToCart,
} from '../Redux/action';

const CartItem = () => {
  const carts = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();

  const handleRemoveToCart = item => {
    dispatch(removeToCart(item));
  };

  const handleIncrement = item => {
    dispatch(incrementQuantityItem(item));
  };

  const handleDecrement = item => {
    dispatch(decrementQuantityItem(item));
  };

  return (
    <View style={styles.CartimageContainer}>
      {carts.map(item => (
        <View
          style={[styles.itemContainer, {backgroundColor: '#f2f2f2'}]}
          key={item.id}>
          <View style={styles.imageContainer}>
            <Image style={styles.Cartimage} source={{uri: item.img}} />
          </View>
          <View style={styles.detailsContainer}>
            <Text>{item.name}</Text>
            <Text style={styles.price}>
              Price: ${item.price * item.quantity}
            </Text>
            <View style={[styles.quantityContainer]}>
              <TouchableOpacity
                onPress={() => handleDecrement(item)}
                style={styles.decrementButton}>
                <Text style={styles.CartbuttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleIncrement(item)}
                style={styles.incrementButton}>
                <Text style={styles.CartbuttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveToCart(item)}
              style={{backgroundColor: 'red', padding: 5, borderRadius: 5}}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* Payment Button */}

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => handlePayment()}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
