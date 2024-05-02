import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';

export default function HeaderAuth() {
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
    <View style={styles.headerContainer}>
      <Text style={styles.headerTxt}>Welkom terug!</Text>
      <Text style={styles.headerSecondTxt}>{userInfo?.fullname} 🤝</Text>
      <Image source={require('../assets/icon-avatar-150.png')} style={styles.profilePic} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    top: '4%',
    width: '95%',
    left: '3%',
  },
  headerTxt: {
    fontSize: 19,
    fontWeight: '400',
    color: '#95969D',
    left: '3.5%',
  },
  headerSecondTxt: {
    top: '5%',
    fontSize: 25,
    color: '#0D0D26',
    fontWeight: '500',
    left: '4%',
  },
  profilePic: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
    bottom: '45%',
    right: '5%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
  },
});
