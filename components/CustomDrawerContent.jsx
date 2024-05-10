import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import LogOutButton from './LogOutButton';
import { storage } from '../store/storage';
import { jwtDecode } from 'jwt-decode';

export default function CustomDrawerContent(props) {
  const [userInfo, setUserInfo] = useState(null);

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

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        {userInfo && <Text style={styles.fullName}>👋 {userInfo.fullname}</Text>}
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="help-circle-outline" size={size} color={color} />
        )}
        label="Help"
        onPress={() => alert('Link to help')}
      />
      <LogOutButton buttonStyle={styles.logoutButton} textStyle={styles.logoutText} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    width: 150,
    alignSelf: 'left',
    left: '5%',
    marginTop: 10,
    backgroundColor: '#5669FF',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
