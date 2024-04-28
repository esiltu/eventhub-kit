import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from 'components/AuthContextProvider';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();
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

  const { setLoggedIn } = useAuth();

  // Log out from the app
  async function logOutFromApp() {
    try {
      const token = await storage.getString('token');
      if (token) {
        await storage.delete('token');
      }
      setLoggedIn(false);
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeView>
      <View>
        <Text>{userInfo?.email}</Text>
        <Text>{userInfo?.fullname}</Text>
        <Text>{userInfo?.id}</Text>
        <TouchableOpacity onPress={logOutFromApp}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({});
