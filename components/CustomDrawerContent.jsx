import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../store/storage';
import { jwtDecode } from 'jwt-decode';
import * as Sharing from 'expo-sharing';
import { useAuth } from 'context/AuthContextProvider';

export default function CustomDrawerContent(props) {
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
      const result = await Sharing.shareAsync('/')

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type of', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={imageUri || require('../assets/icon-avatar-150.png')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10, alignSelf: 'flex-start' }}
          />
          <Text style={styles.profileName}>
            {userInfo ? userInfo.fullname : 'User Name'}
          </Text>
        </View>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
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
