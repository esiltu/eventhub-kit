import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';

const JobDetailPage = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <SafeView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Image source={item.icoon} style={styles.icon} />
        <Text style={styles.title}>{item.dag}</Text>
        <Text style={styles.attribute}>{item.tijd}</Text>
        <Text style={styles.attribute}>{item.locatie}</Text>
        <Text style={styles.attribute}>{`Tarief: ${item.tarief}`}</Text>
        <Text style={styles.attribute}>{`Type: ${item.type}`}</Text>
        <Text style={styles.description}>{item.beschrijving}</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Apply pressed')}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Reageer Nu</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default JobDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '15%',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  attribute: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 30,
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
