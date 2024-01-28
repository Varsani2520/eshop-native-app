import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import {styles} from '../../StyleSheet/style';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your vector icon library
import ToastMessage from '../ToastMessage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../Redux/action';

const PaymentModal = ({visible, onClose, totalPrice, onPaymentSubmit}) => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(true); // Track form validity
  const navigation = useNavigation();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
  };

  const handleSubmit = () => {
    if (!cardNumber || !expiryDate || !cvc || !email) {
      // If any field is empty, show a toast message
      setIsFormValid(false);
      return;
    }

    // Validate card number (12 digits)
    if (!/^\d{12}$/.test(cardNumber)) {
      setIsFormValid(false);
      return;
    }

    // Validate CVC (3 digits)
    if (!/^\d{3}$/.test(cvc)) {
      setIsFormValid(false);
      return;
    }

    // Validate email format
    if (!validateEmail()) {
      setIsFormValid(false);
      return;
    }

    // Reset form validity
    setIsFormValid(true);

    // Proceed with payment submission
    onPaymentSubmit({cardNumber, expiryDate, cvc, email});

    // Close the modal
    onClose();
    dispatch(clearCart());
    // Show payment success toast
    setIsFormValid(true);
    setTimeout(() => {
      navigation.navigate('eShop');
    }, 2000);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <ImageBackground
          source={require('../Images/backgroundImage.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.modalContent}>
            <Text style={styles.loginHeaderText}>eShop</Text>
            <Text> Your total is: ${totalPrice.toFixed(2)}</Text>
            {/* Email Input */}
            <TextInput
              style={styles.PaymentInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            {/* Card Number Input */}
            <TextInput
              style={styles.PaymentInput}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={12}
            />
            {/* Expiry Date and CVC Input in the same row */}
            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.PaymentInput, styles.expiryCVCInput]}
                placeholder="Date"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={7}
              />
              <TextInput
                placeholder="CVC"
                style={[styles.PaymentInput, styles.expiryCVCInput]}
                onChangeText={setCvc}
                value={cvc}
                maxLength={3}
                keyboardType="enter-cvc"
              />
            </View>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {' '}
                Payment ${totalPrice.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {!isFormValid && (
        <ToastMessage
          message="Please enter valid information in all fields."
          onClose={() => setIsFormValid(true)}
        />
      )}
    </Modal>
  );
};

export default PaymentModal;
