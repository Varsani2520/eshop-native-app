import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../StyleSheet/style';

const LoginModal = ({isVisible, onClose}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}>
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
            <Button title=" Google" style={styles.googleButton} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LoginModal;
