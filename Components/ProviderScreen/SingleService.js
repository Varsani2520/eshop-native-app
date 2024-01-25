import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';
import {addToCart} from '../Redux/action';
import ToastMessage from '../ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCartActions from '../utils';

const SingleService = ({route}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const {user} = useCartActions();
  const {propKey} = route.params;
  const item = propKey;
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    if (isLoggedIn && user) {
      setToastMessage('Added to cart successfully');
      dispatch(addToCart(item));
    } else {
      setToastMessage('Please login first');
      return;
    }
  };

  const handleBuyNow = () => {
    // Implement your logic for buying now
    console.log('Buy Now');
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const responseUser = await AsyncStorage.getItem('isLoggedIn');
        setLoggedIn(responseUser === 'true');
      } catch (error) {
        console.error('Error retrieving login status:', error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <View style={styles.CardContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: propKey.img}} style={styles.mediumcardImage} />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.headerText}>{propKey.name}</Text>
        <Text>{propKey.description}</Text>
        <Text>{'\n'}</Text>
        <Text>Price: ${propKey.price}</Text>
        <Text>Offer: {propKey.offer}% off</Text>
        <Text>
          Rating: {propKey.rating}{' '}
          {/* <FontAwesome name="star" size={16} color="gold" /> */}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      {toastMessage ? <ToastMessage message={toastMessage} /> : null}
    </View>
  );
};

export default SingleService;
