import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { AppIcon } from 'routers/OnboardingImgRouter';

export default function Header() {
  return (
    <View style={styles.containerHeader}>
      <Image source={AppIcon} style={styles.containerHeaderIcon} />
      <Text style={styles.containerHeaderTxt}>EventHub</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {},
  containerHeaderIcon: {
    width: '15.5%',
    height: '27%',
    top: '20%',
    alignSelf: 'center',
  },
  containerHeaderTxt: {
    textAlign: 'center',
    top: '30%',
    fontSize: 25,
    fontWeight: '600',
  },
});
