import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';
import { Ionicons } from '@expo/vector-icons';

const ICONS = [
  {
    name: 'default',
    icon: require('../../assets/icon.png'),
  },
  {
    name: 'dark',
    icon: require('../../assets/icon-3.png'),
  },
  {
    name: 'fancy',
    icon: require('../../assets/icon-2.png'),
  },
];

export default function Settings() {
  const [userInfo, setUserInfo] = useState(null);
  const [activeIcon, setActiveIcon] = useState('default');

  useEffect(() => {
    const loadCurrentIcon = async () => {
      const icon = await getAppIcon();
      setActiveIcon(icon);
    };
    loadCurrentIcon();
  }, []);

  async function onChangeAppIcon(icon) {
    await setAppIcon(icon);
    setActiveIcon(icon);
  }

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
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.header}>Account Settings</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.email}>{userInfo?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.fullname}>{userInfo?.fullname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.id}>{userInfo?.id}</Text>
        </View>
        <View style={styles.actions}>
          <Text style={styles.header}>App Icon</Text>
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              style={[styles.btn, activeIcon === icon.name ? styles.activeBtn : null]}
              onPress={() => onChangeAppIcon(icon.name)}>
              <Image source={icon.icon} style={styles.iconImage} />
              <Text style={styles.iconText}>{icon.name}</Text>
              {activeIcon === icon.name && (
                <Ionicons name="checkmark-circle" size={24} style={styles.checkmark} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#333',
  },
  infoContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  actions: {
    marginTop: 20,
    alignItems: 'stretch',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  activeBtn: {
    borderColor: '#5669FF',
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  iconText: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  checkmark: {
    marginRight: 15,
    color: '#5669FF',
  },
});
