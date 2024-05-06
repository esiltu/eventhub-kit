import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { useAuth } from 'components/AuthContextProvider';
import { SignIn, SignUp } from 'routers/PageRouter';
import DrawerRouter from './DrawerRouter';
import DrawerWithTabs from './DrawerWithTabs';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerWithTabs} />
      <Stack.Screen name="DrawerRouter" component={DrawerRouter} />
    </Stack.Navigator>
  );
}

export default function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
      <Toast />
    </NavigationContainer>
  );
}
