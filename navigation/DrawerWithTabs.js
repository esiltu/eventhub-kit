import { useAuth } from 'context/AuthContextProvider';
import { storage } from 'store/storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTab, AlgemeneVoorwaarden, TermsOfService, PrivacyPolicy, ContacteerOns } from 'routers/PageRouter';
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
        options={{ drawerLabelStyle: { right: '12.5%', }, headerShown: true, headerTitle: '', drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="AlgemeneVoorwaarden"
        component={AlgemeneVoorwaarden}
        options={{ drawerLabel: 'Algemene voorwaarden', drawerLabelStyle: { right: '12.5%', }, headerShown: true, headerTitle: 'Algemene voorwaarden', drawerIcon: ({ color }) => <Ionicons name="document-outline" size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{
          drawerLabel: 'Gebruikersvoorwaarden',
          drawerLabelStyle: { right: '12.5%', },
          headerTitle: 'Gebruikersvoorwaarden',
          headerShown: true, drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={22} color={color} />
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitle: 'Privacybeleid',
          drawerLabel: 'Privacybeleid', drawerLabelStyle: { right: '12.5%', }, headerShown: true, drawerIcon: ({ color }) => <Ionicons name="lock-closed-outline" size={22} color={color} />
        }}
      />
      <Drawer.Screen
        name="ContacteerOns"
        component={ContacteerOns}
        options={{ headerTitle: 'Contacteer ons', drawerLabel: 'Contacteer ons', drawerLabelStyle: { right: '12.5%', }, headerShown: true, drawerIcon: ({ color }) => <Ionicons name="call-outline" size={22} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}
