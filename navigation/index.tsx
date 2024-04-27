// RootStack.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { BackButton } from '../components/BackButton';
import { Overview, OnboardingPages, SignIn, SignUp } from '../routers/PageRouter';
import { useAuth } from '../components/AuthContextProvider';
import { storage } from 'store/storage';
import { BottomTab } from '../routers/PageRouter';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BottomTab: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const onboardingSeen = storage.getBoolean('hasSeenOnboarding') ?? false;
    setHasSeenOnboarding(onboardingSeen);
    console.log('Has seen onboarding: ', onboardingSeen);
  }, []);

  if (hasSeenOnboarding === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hasSeenOnboarding ? (
          <Stack.Screen
            name="OnboardingPages"
            component={OnboardingPages}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

// SplashScreen component
const SplashScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);

export default RootStack;
