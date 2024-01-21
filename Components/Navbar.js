import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProviderService from './ProviderScreen/ProviderService';
import SingleService from './ProviderScreen/SingleService';
import ProviderScreen from './ProviderScreen/ProviderScreen';
import ProfileScreen from './ProfileScreen/ContactScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import CartItem from './CartScreen/CartItem';
import LoginModal from './LoginModal';
import {useSelector} from 'react-redux';
import SignupModal from './SignupModal';

const StackNav = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Home" component={HomeScreen} />
      <StackNav.Screen name="ProviderService" component={ProviderService} />
      <StackNav.Screen name="SingleService" component={SingleService} />
    </StackNav.Navigator>
  );
};

const Navbar = () => {
  const carts = useSelector(state => state.cart.cartItem);
  const user = useSelector(state => state.user.authUser);
  const Tab = createBottomTabNavigator();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setSignupModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
  };

  const toggleSignupModal = () => {
    setSignupModalVisible(!isSignupModalVisible);
  };
  const handleSignupPress = () => {
    // Show the signup modal and hide the login modal
    setLoginModalVisible(false);
    setSignupModalVisible(true);
  };
  const handleLoginPress = () => {
    // Show the signup modal and hide the login modal
    setLoginModalVisible(true);
    setSignupModalVisible(false);
  };
  useEffect(() => {}, [carts]);
  return (
    <NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoginModalVisible || isSignupModalVisible}
        onRequestClose={() => {
          setLoginModalVisible(false);
          setSignupModalVisible(false);
        }}>
        {isLoginModalVisible ? (
          <LoginModal
            isVisible={isLoginModalVisible}
            onClose={() => setLoginModalVisible(false)}
            onSignupPress={handleSignupPress}
          />
        ) : null}
        {isSignupModalVisible ? (
          <SignupModal
            isVisible={isSignupModalVisible}
            onClose={() => setSignupModalVisible(false)}
            onLoginPress={handleLoginPress}
          />
        ) : null}
      </Modal>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route?.name === 'eShop') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route?.name === 'My Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route?.name === 'All Categories') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route?.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          headerRight: () => {
            if (route?.name === 'eShop') {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginLeft: 70,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'lightgray',
                      paddingRight: 10,
                      marginRight: 10,
                    }}>
                    <TextInput
                      placeholder="Search"
                      style={{
                        flex: 1,
                        padding: 8,
                      }}
                      onChangeText={text => console.log('Search:', text)}
                    />
                    <Icon
                      name="search-outline"
                      size={24}
                      color="grey"
                      onPress={() => console.log('Search icon pressed')}
                    />
                  </View>
                  {user ? (
                    <Icon name="watch-outline" size={24} color="black" />
                  ) : (
                    <Button title="Login" onPress={toggleLoginModal} />
                  )}
                </View>
              );
            } else {
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
            }
          },
        })}>
        <Tab.Screen name="eShop" component={StackNavigation} />
        <Tab.Screen
          name="My Cart"
          component={CartItem}
          options={{
            tabBarBadge: carts.length > 0 ? carts.length.toString() : null,
          }}
        />
        <Tab.Screen name="All Categories" component={ProviderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
