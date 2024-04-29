import { SafeAreaView, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';

type SafeViewProps = {
  children: ReactNode;
};

export default function SafeView({ children }: SafeViewProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
