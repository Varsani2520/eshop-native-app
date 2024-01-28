import React from 'react';
import {View, Text, Button, ToastAndroid, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart, clearFav, logoutUser, logoutuser} from '../Redux/action';
import {deleteAccountService} from '../../services/SignupService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastMessage from '../ToastMessage';
import {styles} from '../../StyleSheet/style';
import {useNavigation} from '@react-navigation/native';

const ProfileDeleteAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.authUser.data);
  const navigation = useNavigation();
  async function deleteAccount() {
    try {
      const response = await deleteAccountService(user?.token);

      // Remove favorites, clear cart, and logout user
      dispatch(clearFav());
      dispatch(clearCart());
      dispatch(logoutuser());

      // Set 'isLoggedIn' to 'false' in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'false');
      <ToastMessage message={'Account delete Succefully'} />;
      navigation.navigate('eShop');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.CardContainer}>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&usqp=CAU',
            }}
            style={styles.avatar}
          />
        </View>

        <Text>Are you sure to Delete this Account?</Text>
        <Button title="Delete Account" onPress={deleteAccount} />
      </View>
    </View>
  );
};

export default ProfileDeleteAccount;
