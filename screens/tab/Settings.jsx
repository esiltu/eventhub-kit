import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import { LogOutButton } from '../../routers/Components';

export default function Settings() {
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
});
