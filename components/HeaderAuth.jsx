import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
      <Text style={styles.headerTxt}>
        Welkom <Text style={styles.headerSecondTxt}>{userInfo?.fullname}</Text> 🤝
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // styles
  headerContainer: {
    top: '5%',
    width: '95%',
    left: '3%',
  },
  headerTxt: {
    fontSize: 24,
    fontWeight: '300',
    color: 'black',
    left: '3.5%',
  },
  headerSecondTxt: {
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
