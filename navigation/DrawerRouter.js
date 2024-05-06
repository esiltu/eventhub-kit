import JobDetailPage from 'screens/tab/diensten/DienstenPage';
import AppIcon from '../screens/tab/AppIcon';
import UserInfo from '../screens/tab/UserInfo';
import BestandenWerker from '../screens/tab/BestandenWerker';
import NotificatieService from '../screens/tab/NotificatieService';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function DrawerRouter() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
