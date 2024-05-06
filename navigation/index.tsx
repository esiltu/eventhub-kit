import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAuth } from 'components/AuthContextProvider';
import { storage } from 'store/storage';
import BottomTab from 'screens/tab/BottomTab';
import CustomDrawerContent from 'components/CustomDrawerContent';
import { SignIn, SignUp } from 'routers/PageRouter';
import JobDetailPage from 'screens/tab/diensten/DienstenPage';
import AppIcon from '../screens/tab/AppIcon';
import UserInfo from '../screens/tab/UserInfo';
import BestandenWerker from '../screens/tab/BestandenWerker';
import NotificatieService from '../screens/tab/NotificatieService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerWithTabs() {
  const { setLoggedIn } = useAuth();
  const logOutFromApp = async () => {
    try {
      await storage.delete('token');
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={logOutFromApp} style={{ marginRight: 15 }}>
            <Ionicons name="log-out-outline" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </Drawer.Navigator>
  );
}

export default function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Drawer" component={DrawerWithTabs} />
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
            <Stack.Screen
              name="NotificatieService"
              component={NotificatieService}
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