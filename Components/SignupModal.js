import React, {useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import {styles} from '../StyleSheet/style';
import {useNavigation} from '@react-navigation/native';

const SignupModal = ({isVisible, onClose, onLoginPress}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  const handleSignup = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Address:', address);
  };

  const handleLogin = () => {
    onLoginPress();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* Backdrop */}
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
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
              />
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>or</Text>              
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.orText}> Already  have an account ? Login</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SignupModal;
