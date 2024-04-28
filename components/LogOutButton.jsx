import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../store/storage';
import { useAuth } from './AuthContextProvider';

export default function LogOutButton() {
  const { setLoggedIn } = useAuth();
  const navigation = useNavigation();

  const logOutFromApp = async () => {
    try {
      await storage.delete('token');
      setLoggedIn(false);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={logOutFromApp}>
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
