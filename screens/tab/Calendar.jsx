import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SafeView from 'components/SafeView';

const Calendar = () => {
  return (
    <SafeView>
      <View style={styles.container}>
        <Text>Calendar</Text>
      </View>
    </SafeView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
