import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { storage } from 'store/storage';

const Home = () => {
  const handleLogout = () => {
    storage.delete('token');
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
