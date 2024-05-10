import { useAuth } from 'context/AuthContextProvider';
import { storage } from 'store/storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTab } from 'routers/PageRouter';
import CustomDrawerContent from 'components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerWithTabs() {
  const { setLoggedIn } = useAuth();

  // Log out from the app
  const logOutFromApp = async () => {
    try {
      await storage.delete('token');
      await storage.delete('userImage');
      console.log('Logged out');
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
          <TouchableOpacity onPress={logOutFromApp} style={{ marginRight: 15, right: '5%', }}>
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
