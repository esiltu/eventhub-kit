import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import { LogOutButton } from '../../routers/Components';

export default function Settings() {
  const [userInfo, setUserInfo] = useState(null);

  // Get user info from the token
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
        <Text style={styles.email}>{userInfo?.email}</Text>
        <Text style={styles.fullname}>{userInfo?.fullname}</Text>
        <Text style={styles.id}>{userInfo?.id}</Text>
        <LogOutButton />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fullname: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  id: {
    fontSize: 12,
    color: 'darkgray',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});
