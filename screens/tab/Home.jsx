import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeView from 'components/SafeView';

export default function Home() {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Soon more here!</Text>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
