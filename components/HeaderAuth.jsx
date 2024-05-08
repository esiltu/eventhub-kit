import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useUser } from 'context/UserContent';

export default function HeaderAuth() {
  const { userInfo, imageUri } = useUser();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTxt}>Welkom terug!</Text>
      <Text style={styles.headerSecondTxt}>{userInfo?.fullname} 🤝</Text>
      <Image
        source={imageUri || require('../assets/icon-avatar-150.png')}
        style={styles.profilePic}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    top: '4%',
    width: '95%',
    left: '4%',
  },
  headerTxt: {
    fontSize: 19,
    fontWeight: '400',
    color: '#95969D',
    left: '2%',
  },
  headerSecondTxt: {
    top: '5%',
    fontSize: 25,
    color: '#0D0D26',
    fontWeight: '500',
    left: '2%',
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
