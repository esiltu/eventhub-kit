import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import BottomTab from '../screens/tab/BottomTab';
import CustomDrawerContent from 'components/CustomDrawerContent';
import { OnboardingPages, SignIn, SignUp } from '../routers/PageRouter';
import { useAuth } from '../components/AuthContextProvider';
import { storage } from 'store/storage';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Drawer: undefined;
  BottomTab: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function DrawerWithTabs() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </Drawer.Navigator>
  );
}

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
          <Stack.Screen name="Drawer" component={DrawerWithTabs} />
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
