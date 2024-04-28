import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SafeView from 'components/SafeView';

export default function Home() {
  return (
    <SafeView>
      <Text>Home</Text>
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
