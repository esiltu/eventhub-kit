import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Settings from './Settings';
import Calendar from './Calendar';
import Diensten from './Diensten';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Diensten') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5669FF',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Index" component={Home} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name="Diensten" component={Diensten} options={{ headerShown: false }} />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false, title: 'Rooster' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, title: 'Profiel' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
