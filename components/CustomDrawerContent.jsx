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

export default function CustomDrawerContent(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [imageUri, setImageUri] = useState(null);


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

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={imageUri}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10, alignSelf: 'flex-start' }}
          />
          <Text style={styles.profileName}>
            {userInfo ? userInfo.fullname : 'User Name'}
          </Text>
        </View>

        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            )}
            label="Help"
            onPress={() => alert('Link to help')}
          />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity onPress={() => { }} style={styles.bottomDrawerItem}>
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
