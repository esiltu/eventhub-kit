import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import SafeView from 'components/SafeView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BestandenWerker = () => {
  const navigation = useNavigation();
  return (
    <SafeView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Bestanden</Text>
      </View>
    </SafeView>
  );
};

export default BestandenWerker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    left: '4%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2C3E50',
    bottom: '7%',
  },
});
