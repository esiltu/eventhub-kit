import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserInfo = () => {
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

  const navigation = useNavigation();

  return (
    <SafeView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.header}>Gebruikersinformatie</Text>
        <Image source={require('../../assets/icon-avatar-150.png')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.detail}>{userInfo?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Volledige naam:</Text>
          <Text style={styles.detail}>{userInfo?.fullname}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Gebruikers-ID:</Text>
          <Text style={styles.detail}>{userInfo?.id}</Text>
        </View>
      </View>
    </SafeView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2C3E50',
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  label: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  detail: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 75, 
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
