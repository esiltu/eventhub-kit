import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();

const JobFunction = ({ item }) => (
  <SafeView>
    <View style={styles.tabContent}>
      <Text style={styles.dateText}>{`Datum: ${item.datum}`}</Text>
      <Text style={styles.rateText}>{`Uurtarief: ${item.tarief}`}</Text>
      <Text style={styles.description}>{item.beschrijving}</Text>
      <Text style={styles.requirements}>{item.vereisten.join(', ')}</Text>
    </View>
  </SafeView>
);

const AboutUs = ({ item }) => (
  <SafeView>
    <View style={styles.tabContent}>
      <Text style={styles.description}>{item.bedrijfsinfo?.over_ons}</Text>
      <Text style={styles.companyName}>{item.bedrijfsinfo?.naam}</Text>
    </View>
  </SafeView>
);

const ExtraInfo = ({ item }) => (
  <SafeView>
    <View style={styles.tabContent}>
      <Text style={styles.description}>{item.vacatureshift_info?.extra}</Text>
      <Text style={styles.description}>{item.vacatureshift_info?.toelichting}</Text>
    </View>
  </SafeView>
);

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
      <Text style={styles.title}>{item.functie}</Text>
      <View style={styles.typeBadge}>
        <Ionicons name="business" size={16} color="black" style={{ left: '80%' }} />
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
      <Tab.Navigator
        style={{ top: '10%' }}
        screenOptions={{
          labelStyle: { fontSize: 12 },
          tabStyle: { width: width / 3 },
          style: { backgroundColor: 'white' },
        }}>
        <Tab.Screen name="Functie" children={() => <JobFunction item={item} />} />
        <Tab.Screen name="Over Ons" children={() => <AboutUs item={item} />} />
        <Tab.Screen name="Extra Info" children={() => <ExtraInfo item={item} />} />
      </Tab.Navigator>
      <TouchableOpacity style={styles.button} onPress={applyForJob}>
        <Text style={styles.buttonText}>Reageer Nu</Text>
        <Ionicons name="checkmark-circle" size={24} color="white" style={{ marginLeft: 10 }} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  requirements: {
    fontSize: 16,
    color: '#444',
    marginTop: 5,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 5,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f3a683',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    bottom: '2.5%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    top: '12.5%',
    left: 20,
    zIndex: 10,
  },
  imageStyle: {
    backgroundColor: '#f3a683',
    height: 400,
    width: 400,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 60,
    bottom: '70%',
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
});
