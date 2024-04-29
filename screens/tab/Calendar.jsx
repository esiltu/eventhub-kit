import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const jobSchedule = [
  {
    day: 'Monday',
    time: '9:00 AM - 5:00 PM',
    location: 'Downtown Office',
  },
  {
    day: 'Tuesday',
    time: '10:00 AM - 6:00 PM',
    location: 'City Hall Annex',
  },
  {
    day: 'Wednesday',
    time: '9:00 AM - 5:00 PM',
    location: 'Remote',
  },
];

const JobSchedulePage = () => {
  return (
    <View style={styles.container}>
      <FlashList
        data={jobSchedule}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={60}
      />
    </View>
  );
};

export default JobSchedulePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
