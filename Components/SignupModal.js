import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {styles} from '../StyleSheet/style';
import {signupservice} from '../services/SignupService';
import ToastMessage from './ToastMessage';

const SignupModal = ({isVisible, onClose, onLoginPress}) => {
  const [toastMessage, setToastMessage] = useState('');
  const [signup, setSignup] = useState({
    username: '',
    password: '',
    name: '',
    address: '',
  });

  async function handleSubmit() {
    if (
      !signup.username ||
      !signup.password ||
      !signup.name ||
      !signup.address
    ) {
      setToastMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await signupservice(
        signup.username,
        signup.password,
        signup.name,
        signup.address,
      );
      console.log('signup user', response);
      setToastMessage('Account Created Successfully');
    } catch (error) {
      setToastMessage('Failed to Create Account');
      console.log(error);
    }
  }

  const handleLogin = () => {
    onLoginPress();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <ToastMessage message={toastMessage} />
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}>
        <ImageBackground
          source={require('../Components/Images/backgroundImage.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.modalContent}>
            <Text style={styles.loginHeaderText}>Signup</Text>
            <TextInput
              placeholder="Username"
              onChangeText={text => setSignup({...signup, username: text})}
              value={signup.username}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={text => setSignup({...signup, password: text})}
              value={signup.password}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="Name"
              onChangeText={text => setSignup({...signup, name: text})}
              value={signup.name}
              style={styles.input}
            />
            <TextInput
              placeholder="Address"
              onChangeText={text => setSignup({...signup, address: text})}
              value={signup.address}
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.orText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Modal>
  );
};

export default SignupModal;
