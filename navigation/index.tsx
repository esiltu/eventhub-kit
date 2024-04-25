import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';

import { BackButton } from '../components/BackButton';
import { Overview, Details, OnboardingPages, SignIn, SignUp } from '../routers/PageRouter';
import { storage } from 'data/storage';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Properly check if onboarding has been seen
    const onboardingSeen = storage.getBoolean('hasSeenOnboarding') ?? false;
    setHasSeenOnboarding(onboardingSeen);
    console.log('Has seen onboarding: ', onboardingSeen);
  }, []);

  // Optional: Add a loading state handler if needed, for example using a Splash Screen
  if (hasSeenOnboarding === null) {
    return <SplashScreen />; // Define a simple SplashScreen component or similar placeholder
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hasSeenOnboarding && (
          <Stack.Screen
            name="OnboardingPages"
            component={OnboardingPages}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        )}
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
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Example SplashScreen component
const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);
