import React, { useCallback } from 'react';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Settings from './Settings';
import Calendar from './Calendar';
import Diensten from './Diensten';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Tabs = AnimatedTabBarNavigator();

export default function BottomTabNavigator() {

  const [fontsLoaded, fontError] = useFonts({
    'DynaPuff-Regular': require('../../assets/fonts/DynaPuff-Regular.ttf'),
  });


  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        tabStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        labelStyle: {
          fontFamily: 'DynaPuff-Regular',
        },
      }}
      appearance={{
        topPadding: 20,
        horizontalPadding: 20,
        tabBarBackground: 'white',
        floating: false,
        dotCornerRadius: 100,
        dotSize: 'medium',
        activeTabBackgrounds: '#f3a683',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Settings':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Diensten':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Calendar':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            default:
              iconName = 'circle';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Index" component={Home} options={{ title: 'Home' }} />
      <Tabs.Screen name="Diensten" component={Diensten} options={{ title: 'Diensten' }} />
      <Tabs.Screen name="Calendar" component={Calendar} options={{ title: 'Rooster' }} />
      <Tabs.Screen name="Settings" component={Settings} options={{ title: 'Profiel' }} />
    </Tabs.Navigator>
  );
}
