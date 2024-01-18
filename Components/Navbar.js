import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ProviderService from './ProviderScreen/ProviderService';
import SingleService from './ProviderScreen/SingleService';
import ProviderScreen from './ProviderScreen/ProviderScreen';
import ProfileScreen from './ProfileScreen/ContactScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native';

const StackNav = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <StackNav.Navigator>
      <StackNav.Screen
        name="eShop"
        component={HomeScreen}
        options={{
          headerRight: () => <Button title="Sign in" />,
          headerShown: false,
        }}
      />
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
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          // headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          },
        })}>
        <Tab.Screen name="Home" component={StackNavigation} />
        <Tab.Screen name="Categories" component={ProviderScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navbar;
