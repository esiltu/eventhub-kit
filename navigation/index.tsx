import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Animated, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { OnboardingPages, SignIn, SignUp, BottomTab } from '../routers/PageRouter';
import { useAuth } from '../components/AuthContextProvider';
import { storage } from 'store/storage';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  SignUp: undefined;
  BottomTab: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AnimatedBottomTab = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <BottomTab />
    </Animated.View>
  );
};

const RootStack: React.FC = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    async function loadInitialData() {
      const seenOnboarding = await storage.getBoolean('hasSeenOnboarding');
      setHasSeenOnboarding(seenOnboarding ?? null);
      setLoading(false);
    }

    loadInitialData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasSeenOnboarding === null) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="OnboardingPages" component={OnboardingPages} />
        ) : isLoggedIn ? (
          <Stack.Screen name="BottomTab" component={AnimatedBottomTab} />
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
};

const SplashScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);

export default RootStack;
