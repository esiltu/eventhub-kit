import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';

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
      <View>
        <Text>{userInfo?.email}</Text>
        <Text>{userInfo?.fullname}</Text>
        <Text>{userInfo?.id}</Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({});
