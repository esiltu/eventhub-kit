import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { storage } from 'store/storage';
import SafeView from 'components/SafeView';

export default function Home() {
  const handleLogout = () => {
    storage.delete('token');
  };

  return (
    <SafeView>
      <Text>Home</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeView>
  );
}

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
