import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen/HomeScreen';
import ProviderService from './ProviderScreen/ProviderService';
import SingleService from './ProviderScreen/SingleService';
import ProviderScreen from './ProviderScreen/ProviderScreen';
import ProfileScreen from './ProfileScreen/ContactScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button as RNButton, Image, Modal, TextInput, View} from 'react-native';
import CartItem from './CartScreen/CartItem';
import {styles} from '../StyleSheet/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCartActions from './utils';
import HomeNav from './Models/HomeNav';
import LoginModal from './Models/LoginModal';
import SignupModal from './Models/SignupModal';
import {useSelector} from 'react-redux';
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
const ProfileTab = () => <LoginModal />;

const CartTab = () => <LoginModal />;
const Navbar = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const {carts, user} = useCartActions();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const responseUser = await AsyncStorage.getItem('isLoggedIn');
        setLoggedIn(responseUser === 'true');
      } catch (error) {
        console.error('Error retrieving login status:', error);
      }
    };

    checkLoginStatus();
  }, [carts]);

  const loginModelOpen = () => {
    setSignupModalVisible(false);
    setLoginModalVisible(true);
  };
  const signupModelOpen = () => {
    setLoginModalVisible(false);
    setSignupModalVisible(true);
  };
  return (
    <NavigationContainer>
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
                  {isLoggedIn ? (
                    <View style={styles.NavavatarContainer}>
                      <Image
                        source={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&usqp=CAU',
                        }}
                        style={styles.Navavatar}
                      />
                    </View>
                  ) : (
                    <RNButton
                      title="LOGIN"
                      onPress={() => setLoginModalVisible(true)}
                    />
                  )}
                </View>
              );
            } else {
              return <HomeNav />;
            }
          },
        })}>
        <Tab.Screen name="eShop" component={StackNavigation} />
        {isLoggedIn && user ? (
          <Tab.Screen
            name="My Cart"
            component={CartItem}
            options={{
              tabBarBadge: carts.length > 0 ? carts.length.toString() : null,
              tabBarBadgeStyle: {
                backgroundColor: 'green',
                position: 'absolute',
                top: '-30',
                left: 5,
              },
            }}
          />
        ) : (
          <Tab.Screen
            name="My Cart"
            component={() => <CartTab />}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                e.preventDefault();
                setLoginModalVisible(true);
              },
            })}
          />
        )}

        <Tab.Screen name="All Categories" component={ProviderScreen} />
        {isLoggedIn && user ? (
          <Tab.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <Tab.Screen
            name="Profile"
            component={() => <ProfileTab />}
            listeners={({navigation, route}) => ({
              tabPress: e => {
                e.preventDefault();
                setLoginModalVisible(true);
              },
            })}
          />
        )}
      </Tab.Navigator>
      {loginModalVisible && (
        <LoginModal
          SignupOpen={() => signupModelOpen()}
          setLoginModel={() => loginModelOpen()}
          onClose={() => setLoginModalVisible(false)}
        />
      )}

      {signupModalVisible && (
        <SignupModal
          LoginModelOepn={() => loginModelOpen()}
          onClose={() => setSignupModalVisible(false)}
          setSignupModal={() => signupModelOpen()}
        />
      )}
    </NavigationContainer>
  );
};

export default Navbar;
