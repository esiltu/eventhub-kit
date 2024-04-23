import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function FormSignIn() {
  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Sign in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  formHeaderContainer: {},
  formHeaderTxt: {
    textAlign: 'left',
    left: '10%',
    fontSize: 25,
    fontWeight: '500',
  },
});
