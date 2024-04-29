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
          {/* <Text style={styles.goBackText}>Go Back</Text> */}
        </TouchableOpacity>
        <Image source={{ uri: item.icon }} style={styles.icon} />
        <Text style={styles.title}>{item.day}</Text>
        <Text style={styles.attribute}>{item.time}</Text>
        <Text style={styles.attribute}>{item.location}</Text>
        <Text style={styles.attribute}>{`Rate: ${item.rate}`}</Text>
        <Text style={styles.attribute}>{`Type: ${item.type}`}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Apply pressed')}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Reageer als eerste</Text>
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
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '15%',
  },
  goBackText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
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
