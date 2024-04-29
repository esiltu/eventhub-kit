import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';

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
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              style={styles.btn}
              onPress={() => onChangeAppIcon(icon.name)}>
              <Image source={icon.icon} style={{ width: 24, height: 24 }} />
              <Text style={{ color: 'black', fontSize: 18 }}>{icon.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* <LogOutButton /> */}
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
    textAlign: 'center',
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5669FF',
  },
  fullname: {
    fontSize: 16,
    color: '#333',
  },
  id: {
    fontSize: 14,
    color: 'darkgray',
  },
  actions: {
    backgroundColor: 'rgba(256,256,256,0.1)',
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
});
