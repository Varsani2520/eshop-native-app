import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProviderService from './ProviderScreen/ProviderService';
import SingleService from './ProviderScreen/SingleService';
import ProviderScreen from './ProviderScreen/ProviderScreen';
import ProfileScreen from './ProfileScreen/ContactScreen';

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
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={StackNavigation}
          options={{
            headerTitle: 'eShop',
          }}
        />
        <Tab.Screen name="Categories" component={ProviderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
