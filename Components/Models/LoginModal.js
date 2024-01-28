import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../StyleSheet/style';
import {loginservice} from '../../services/LoginService';
import {loginUserFailure, loginUserSuccess} from '../Redux/action';
import {useDispatch} from 'react-redux';
import ToastMessage from '../ToastMessage';
import {useNavigation} from '@react-navigation/native';

const LoginModal = ({SignupOpen, setLoginModel, onClose}) => {
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState('');
  const navigation = useNavigation();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit() {
    if (!login.username || !login.password) {
      setToastMessage('Please fill in all the fields');
      return;
    }

    try {
      const response = await loginservice(login.username, login.password);
      // Store user information in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response));
      // Set a flag to indicate that the user is logged in
      await AsyncStorage.setItem('isLoggedIn', 'true');
      dispatch(loginUserSuccess(response));
      setToastMessage('Logged in successfully');
      setLoginModel(false);
      onClose();
      setTimeout(() => {
        navigation.navigate('eShop'); // Replace 'eShop' with the desired screen name
      }, 2000);
    } catch (error) {
      setToastMessage('Login failed');
      dispatch(loginUserFailure);
      await AsyncStorage.setItem('isLoggedIn', 'false');
      console.log(error);
    }
  }

  return (
    <Modal visible={true} animationType="slide" transparent>
      <ToastMessage message={toastMessage} />
      <View style={styles.backdrop}>
        <ImageBackground
          source={require('../Images/backgroundImage.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.modalContent}>
            <Text style={styles.loginHeaderText}>Login</Text>
            <TextInput
              placeholder="Username"
              onChangeText={text => setLogin({...login, username: text})}
              value={login.username}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={text => setLogin({...login, password: text})}
              value={login.password}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <View style={styles.space} />
            <TouchableOpacity onPress={() => SignupOpen()}>
              <Text style={styles.orText}>
                Already have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default LoginModal;
