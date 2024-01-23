import React from 'react';
import {View, Text, Button, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart, clearFav, logoutUser, logoutuser} from '../Redux/action';
import {deleteAccountService} from '../../services/SignupService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../ToastMessage';

const ProfileDeleteAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.authUser.data);

  async function deleteAccount() {
    try {
      const response = await deleteAccountService(user?.token);

      // Remove favorites, clear cart, and logout user
      dispatch(clearFav());
      dispatch(clearCart());
      dispatch(logoutuser());

      // Set 'isLoggedIn' to 'false' in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'false');

      // Show toast message and navigate to the home screen
      ToastAndroid.show('Account deleted successfully', ToastAndroid.SHORT);
      navigation?.navigate('eShop');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>ProfileDeleteAccount</Text>
      <Button title="Delete Account" onPress={deleteAccount} />
    </View>
  );
};

export default ProfileDeleteAccount;
