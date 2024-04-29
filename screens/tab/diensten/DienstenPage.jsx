import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';

const JobDetailPage = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <SafeView>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Image source={item.icoon} style={styles.icon} />
        <Text style={styles.title}>{item.functie}</Text>
        <View style={[styles.typeBadge, item.type === 'Op Locatie' ? styles.onSite : {}]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.attribute}>{item.datum}</Text>
          <Text style={styles.attribute}>{item.locatie}</Text>
          <Text style={styles.attribute}>{`Tarief: ${item.tarief}`}</Text>
          <Text style={styles.description}>{item.beschrijving}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Apply pressed')}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Reageer Nu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeView>
  );
};

export default JobDetailPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  onSite: {
    backgroundColor: '#4CAF50',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
  },
  attribute: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
    textAlign: 'left',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});
