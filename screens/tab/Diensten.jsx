import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SafeView from 'components/SafeView';

const Diensten = () => {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>Diensten</Text>
      </View>
    </SafeView>
  );
};

export default Diensten;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
});
