import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import { useAuth } from 'components/AuthContextProvider';
import { SignIn, SignUp } from 'routers/PageRouter';

import DrawerRouter from './DrawerRouter';
import DrawerWithTabs from './DrawerWithTabs';

const Stack = createStackNavigator();

export default function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {/* Drawer  */}
            <Stack.Screen name="Drawer" component={DrawerWithTabs} />
            <Stack.Screen
              // Auth Drawer
              name="DrawerRouter"
              component={DrawerRouter}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
