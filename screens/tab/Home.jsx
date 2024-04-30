import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeView from 'components/SafeView';
import HeaderAuth from 'components/HeaderAuth';

export default function Home() {
  return (
    <SafeView>
      <HeaderAuth />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
