import JobDetailPage from '../screens/tab/diensten/JobDetailPage';
import AppIcon from '../screens/tab/AppIcon';
import UserInfo from '../screens/tab/UserInfo';
import BestandenWerker from '../screens/tab/BestandenWerker';
import NotificatieService from '../screens/tab/NotificatieService';
import Diensten from 'screens/tab/Diensten';
import HomeDienstenDisplay from 'components/HomeDienstenDisplay';
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
          gestureEnabled: true,
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
      <Stack.Screen
        name="Diensten"
        component={Diensten}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="HomeDienstenDisplay"
        component={HomeDienstenDisplay}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
