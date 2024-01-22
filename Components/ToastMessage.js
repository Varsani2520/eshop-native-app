import React, { useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';

const ToastMessage = ({ message }) => {
  useEffect(() => {
    if (message) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50,
      );
    }
  }, [message]);

  return <View />;
};

export default ToastMessage;
