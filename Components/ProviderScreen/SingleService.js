import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../StyleSheet/style';
import {addToCart} from '../Redux/action';
import ToastMessage from '../ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SingleService = ({route}) => {
  const [toastMessage, setToastMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const user = useSelector(state => (state.user.message = 'true'));
  const {propKey} = route.params;
  const item = propKey;
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    if (isLoggedIn && user) {
      setToastMessage('added to success');
      dispatch(addToCart(item));
    } else {
      setToastMessage('please login first');
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
      <ToastMessage message={toastMessage} />
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
    </View>
  );
};

export default SingleService;
