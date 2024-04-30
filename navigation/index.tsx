import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import JobDetailPage from 'screens/tab/diensten/DienstenPage';
import BottomTab from '../screens/tab/BottomTab';
import CustomDrawerContent from 'components/CustomDrawerContent';
import { OnboardingPages, SignIn, SignUp } from '../routers/PageRouter';
import { useAuth } from '../components/AuthContextProvider';
import { storage } from 'store/storage';
import UserInfo from 'screens/tab/UserInfo';
import AppIcon from 'screens/tab/AppIcon';
import BestandenWerker from 'screens/tab/BestandenWerker';
// import DienstenFormulier from 'screens/tab/diensten/DienstenFormulier';

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  AppIcon: undefined;
  SignUp: undefined;
  UserInfo: undefined;
  Drawer: undefined;
  BestandenWerker: undefined;
  // DienstenFormulier: undefined;
  BottomTab: undefined;
  JobDetailPage: { id: string; title: string };
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
          <>
            <Stack.Screen name="Drawer" component={DrawerWithTabs} options={{ title: '' }} />
            <Stack.Screen
              name="JobDetailPage"
              component={JobDetailPage}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="AppIcon"
              component={AppIcon}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="BestandenWerker"
              component={BestandenWerker}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            />
            {/* <Stack.Screen
              name="DienstenFormulier"
              component={DienstenFormulier}
              options={{
                headerShown: false,
                headerTitle: '',
              }}
            /> */}
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
};

const SplashScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Loading...</Text>
  </View>
);

export default RootStack;
