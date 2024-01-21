import {View, ImageBackground} from 'react-native';
import React from 'react';

const Backgrond = ({children}) => {
  return (
    <View>
      <ImageBackground
        source={require('.Images/backgroundImage.jpg')}
        style={{height: '100%'}}
      />{' '}
      <View>{children}</View>
    </View>
  );
};

export default Backgrond;
