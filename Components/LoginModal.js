// LoginModal.js
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../StyleSheet/style';

const LoginModal = ({isVisible, onClose, onSignupPress}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    // You can close the modal after handling the login
    onClose();
  };

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
      <View style={styles.modalContainer}>
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
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={styles.input}
              />
              <Button
                title="Login"
                onPress={handleLogin}
                style={styles.loginButton}
              />
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
      </View>
    </Modal>
  );
};

export default LoginModal;
