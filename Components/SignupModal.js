import React, {useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../StyleSheet/style';
import {useNavigation} from '@react-navigation/native';

const SignupModal = ({isVisible, onClose}) => {
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
    navigation.navigate('Login');
  
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
          onPress={onClose}>
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
            <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>or</Text>
            <View style={styles.space} />
            <Text style={styles.orText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.orText}> Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SignupModal;
