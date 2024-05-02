import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';
import { storage } from 'store/storage';
import axios from 'axios';

const JobDetailPage = ({ route }) => {
  const { item } = route.params ?? {};
  const navigation = useNavigation();

  if (!item) {
    console.error('No job item provided.');
    return (
      <View style={styles.container}>
        <Text>No job details available.</Text>
      </View>
    );
  }

  const applyForJob = () => {
    const title = `${item.functie}`;
    const message = 'Weet je zeker dat je wilt reageren op deze functie?';
    const buttons = [
      { text: 'Nee', onPress: () => console.log('Reageren geannuleerd'), style: 'cancel' },
      {
        text: 'Ja',
        onPress: () => {
          try {
            console.log(`Applying for: ${item.functie}`);
            Alert.alert(
              'Bevestigd',
              `Je hebt gereageerd op de functie: ${item.functie}.\nBinnen 24 uur zie je een reactie 📝⚡️`
            );
          } catch (error) {
            console.error('Application failed:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden bij het reageren.');
          }
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };

  return (
    <SafeView>
      <Image
        source={require('../../../assets/auth-icons/diensten-achtergrond.png')}
        style={styles.imageStyle}
      />
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={40} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: item.icoon }} style={styles.icon} />
      <View style={{ flex: 1, bottom: '56.5%' }}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.functie}</Text>
          <View style={styles.viewTariefLocatieStyle}>
            <Text style={styles.attribute}>{`Tarief: ${item.tarief} -`}</Text>
            <Text style={styles.attribute}>{`Locatie: ${item.locatie}`}</Text>
          </View>
          <View style={styles.typeBadge}>
            <Ionicons name="business" size={16} color="black" style={{ left: '80%' }} />
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          <View style={{}}>
            <Text style={styles.description}>{`Datum: ${item.datum}`}</Text>
            <Text style={styles.description}>{item.beschrijving}</Text>
            <Text style={styles.description}>{item.bedrijfsinfo?.beschrijving}</Text>
            <Text style={styles.description}>{item.bedrijfsinfo?.extra}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={applyForJob}>
        <Text style={styles.buttonText}>Reageer Nu</Text>
        <Ionicons name="checkmark-circle" size={24} color="white" style={{ left: '50%' }} />
      </TouchableOpacity>
    </SafeView>
  );
};

export default JobDetailPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  viewTariefLocatieStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '11.5%',
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    left: '8.5%',
    bottom: '47.5%',
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
    bottom: '55%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    width: '35%',
    top: '2%',
    alignSelf: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  attribute: {
    top: '10%',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    left: '7.5%',
    top: '15%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f3a683',
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    width: '85%',
    alignSelf: 'center',
    bottom: '15%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageStyle: {
    height: 400,
    width: 400,
    alignSelf: 'center',
    bottom: '12%',
    borderRadius: 60,
    backgroundColor: '#f3a683',
  },
  detailsContainer: {
    // padding: 20,
    // bottom: '10%',
  },
});
