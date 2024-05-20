import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import * as Sharing from 'expo-sharing';
import { useAuth } from 'context/AuthContextProvider';
import { BottomTab, AlgemeneVoorwaarden, TermsOfService, PrivacyPolicy, ContacteerOns } from 'routers/PageRouter';
import { UserProvider } from 'context/UserContent';
import Toast from 'react-native-toast-message';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({
  state,
  descriptors,
  navigation
}) {
  const [userInfo, setUserInfo] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const { setLoggedIn } = useAuth();

  const loadImageUri = async () => {
    const storedUri = await storage.getString('userImage');
    if (storedUri) {
      setImageUri({ uri: storedUri });
    }
  };

  useEffect(() => {
    loadImageUri();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await storage.getString('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUserInfo(decoded);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

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

  const shareApp = async () => {
    try {
      const result = await Sharing.shareAsync('/');

      if (result.action === Sharing.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type of', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Sharing.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.profileContainer}>
          <Image
            source={imageUri || require('../assets/icon-avatar-150.png')}
            style={{ height: 80, width: 80, borderRadius: 50, marginBottom: 10, alignSelf: 'flex-start' }}
          />
          <Text style={styles.profileName}>
            {userInfo ? userInfo.fullname : 'User Name'}
          </Text>
        </View>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList state={state} descriptors={descriptors} navigation={navigation} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity onPress={shareApp} style={styles.bottomDrawerItem}>
          <View style={styles.drawerItemContainer}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={styles.drawerItemText}>
              Verwijs een flex-werker
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOutFromApp} style={styles.bottomDrawerItem}>
          <View style={styles.drawerItemContainer}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.drawerItemText}>
              Uitloggen
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerWithTabs() {
  const { setLoggedIn } = useAuth();

  const logOutFromApp = async () => {
    try {
      await storage.delete('token');
      await storage.delete('userImage');
      Toast.show({
        type: 'success',
        text1: 'Uitgelogd en tot snel! 👋',
        text1Style: { textAlign: 'center' }
      });
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={logOutFromApp} style={{ marginRight: 15, right: '5%' }}>
              <Ionicons name="log-out-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}>
        <Drawer.Screen
          name="Home"
          component={BottomTab}
          options={{
            drawerLabelStyle: { right: '12.5%' },
            headerShown: true,
            headerTitle: '',
            drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
          }}
        />
        <Drawer.Screen
          name="AlgemeneVoorwaarden"
          component={AlgemeneVoorwaarden}
          options={{
            drawerLabel: 'Algemene voorwaarden',
            drawerLabelStyle: { right: '12.5%' },
            headerShown: true,
            headerTitle: 'Algemene voorwaarden',
            drawerIcon: ({ color }) => <Ionicons name="document-outline" size={22} color={color} />
          }}
        />
        <Drawer.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{
            drawerLabel: 'Gebruikersvoorwaarden',
            drawerLabelStyle: { right: '12.5%' },
            headerTitle: 'Gebruikersvoorwaarden',
            headerShown: true,
            drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={22} color={color} />
          }}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: 'Privacybeleid',
            drawerLabel: 'Privacybeleid',
            drawerLabelStyle: { right: '12.5%' },
            headerShown: true,
            drawerIcon: ({ color }) => <Ionicons name="lock-closed-outline" size={22} color={color} />
          }}
        />
        <Drawer.Screen
          name="ContacteerOns"
          component={ContacteerOns}
          options={{
            headerTitle: 'Chat met ons',
            drawerLabel: 'Chat met ons',
            drawerLabelStyle: { right: '12.5%' },
            headerShown: true,
            drawerIcon: ({ color }) => <Ionicons name="call-outline" size={22} color={color} />
          }}
        />
      </Drawer.Navigator>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: '#303952',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  profileText: {
    color: '#fff',
    fontSize: 14,
  },
  drawerItemListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  bottomDrawerSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  bottomDrawerItem: {
    paddingVertical: 15,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 15,
    marginLeft: 5,
  },
});
