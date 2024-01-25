import {Image, TextInput, Button as RNButton, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import useCartActions from '../utils';
const HomeNav = () => {
  const {user} = useCartActions();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 20,
      }}>
      <Icon
        name="search-outline"
        size={24}
        color="grey"
        onPress={() => console.log('Search icon pressed')}
      />
      <Icon
        name="notifications-outline"
        size={24}
        color="grey"
        onPress={() => console.log('Bell icon pressed')}
        style={{marginRight: 0, marginLeft: 10}}
      />
    </View>
  );
};

export default HomeNav;
