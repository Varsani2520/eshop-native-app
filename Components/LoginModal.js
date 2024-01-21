import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {styles} from '../StyleSheet/style';
import {loginservice} from '../services/LoginService';
import {loginUserFailure, loginUserSuccess} from './Redux/action';
import {useDispatch} from 'react-redux';

const showToast = message => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50,
  );
};

const LoginModal = ({isVisible, onClose, onSignupPress}) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit() {
    if (!login.username || !login.password) {
      showToast('Please fill in all the fields');
    }
    try {
      const response = await loginservice(login.username, login.password);
      console.log('login detail', login);
      // Cookies.set('user', true);
      dispatch(loginUserSuccess(response));
      showToast('Logged in successfully');
      onClose();
    } catch (error) {
      showToast('Login failed');
      // Cookies.set('user', false);
      dispatch(loginUserFailure);
      console.log(error);
    }
  }

  const handleSignupPress = () => {
    // Call the onSignupPress prop to show the signup modal and hide the login modal
    onSignupPress();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}>
        <ImageBackground
          source={require('../Components/Images/backgroundImage.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.modalContent}>
            <Text style={styles.loginHeaderText}>Login</Text>
            <TextInput
              placeholder="Username"
              onChangeText={text =>
                setLogin({
                  ...login,
                  username: text,
                })
              }
              value={login.username}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={text =>
                setLogin({
                  ...login,
                  password: text,
                })
              }
              value={login.password}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <View style={styles.space} />
            <TouchableOpacity onPress={handleSignupPress}>
              <Text style={styles.orText}>
                Already have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Modal>
  );
};

export default LoginModal;
