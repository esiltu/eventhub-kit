import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';

const Calendar = () => {
  const navigation = useNavigation();

  const handleSearchAssignment = () => {
    navigation.navigate('Diensten');
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Er zijn nog geen diensten die je geaccepteerd hebt.</Text>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchAssignment}>
        <Text style={styles.searchButtonText}>Zoek Opdracht</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeView>
      <FlashList
        data={[]}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListEmptyComponent={renderEmptyComponent}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContentContainer}
        refreshing={false}
        onRefresh={() => console.log('Refreshing...')}
      />
    </SafeView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContentContainer: {
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
