import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { AppIcon } from 'routers/OnboardingImgRouter';

export default function Header() {
  return (
    <View>
      <Image source={AppIcon} style={styles.containerHeaderIcon} />
      <Text style={styles.containerHeaderTxt}>EventHub</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeaderIcon: {
    width: '15.5%',
    height: '27%',
    top: '17%',
    alignSelf: 'center',
  },
  containerHeaderTxt: {
    textAlign: 'center',
    top: '23%',
    fontSize: 25,
    fontWeight: '600',
  },
});
