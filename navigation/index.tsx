import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

export type RootStackParamList = {
  Overview: undefined;
  OnboardingPages: undefined;
  SignIn: undefined;
  AppIcon: undefined;
  SignUp: undefined;
  UserInfo: undefined;
  Drawer: undefined;
  BestandenWerker: undefined;
  BottomTab: undefined;
  JobDetailPage: { id: string; title: string };
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function DrawerWithTabs() {
  const { setLoggedIn } = useAuth();
  const navigation = useNavigation();

  const logOutFromApp = async () => {
    try {
      await storage.delete('token');
      setLoggedIn(false);
      navigation.navigate('SignIn' as never);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={logOutFromApp} style={{ marginRight: 15, right: '5%' }}>
            <Ionicons name="log-out-outline" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}
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
  const [fadeAnim] = useState(new Animated.Value(0));
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const loadInitialData = async () => {
      const seenOnboarding = await storage.getBoolean('hasSeenOnboarding');
      setHasSeenOnboarding(seenOnboarding ?? null);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f3a683" />
      </View>
    );
  }

  // if (hasSeenOnboarding === null) {
  //   return <SplashScreen />;
  // }

  return (
    <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          {!hasSeenOnboarding ? (
            <Stack.Screen name="OnboardingPages" component={OnboardingPages} />
          ) : isLoggedIn ? (
            <>
              {/* Authorized Pages Only! */}
              <Stack.Screen name="Drawer" component={DrawerWithTabs} options={{ title: '' }} />
              <Stack.Screen
                name="JobDetailPage"
                component={JobDetailPage}
                options={{
                  // gestureEnabled: true,
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
            </>
          ) : (
            <>
              {/* Not Authorized  */}
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Animated.View>
  );
};

// const SplashScreen: React.FC = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <ActivityIndicator color="red" />
//   </View>
// );

export default RootStack;
