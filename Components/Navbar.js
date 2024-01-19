import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProviderService from './ProviderScreen/ProviderService';
import SingleService from './ProviderScreen/SingleService';
import ProviderScreen from './ProviderScreen/ProviderScreen';
import ProfileScreen from './ProfileScreen/ContactScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, TextInput, View} from 'react-native';
import CartItem from './CartScreen/CartItem';
import LoginModal from './LoginModal';

const StackNav = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="eShop" component={HomeScreen} />
      <StackNav.Screen name="ProviderService" component={ProviderService} />
      <StackNav.Screen name="SingleService" component={SingleService} />
    </StackNav.Navigator>
  );
};

const Navbar = () => {
  const Tab = createBottomTabNavigator();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
  };
  return (
    <NavigationContainer>
      <LoginModal isVisible={isLoginModalVisible} onClose={toggleLoginModal} />
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
                  <Button title="Login" onPress={toggleLoginModal} />
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
        <Tab.Screen name="My Cart" component={CartItem} />
        <Tab.Screen name="All Categories" component={ProviderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
