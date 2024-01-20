import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../StyleSheet/style';

const LoginModal = ({ isVisible, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    // You can close the modal after handling the login
    onClose();
  };

  const handleSignUp = () => {
    // Navigate to the signup screen
    navigation.navigate('Signup');
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose} // Handle the request to close the modal
    >
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContent}>
            <Text style={styles.loginHeaderText}>Login</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
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
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.orText}>
                Already have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LoginModal;
