import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Header from 'components/Header';

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
