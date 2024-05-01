import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dienstenVoorbeeld = [
  {
    functie: 'Frontend Ontwikkelaar',
    locatie: 'Amsterdam',
    datum: '10-01-2024 t/m 10-03-2024',
    tarief: '€25/uur',
    type: 'Op Locatie',
    icoon: require('../assets/social-media-icons/github-150.png'),
  },
  {
    functie: 'Backend Ontwikkelaar',
    locatie: 'Rotterdam',
    datum: '11-01-2024 t/m 11-03-2024',
    tarief: '€30/uur',
    type: 'Hybride',
    icoon: require('../assets/social-media-icons/linkedin-150.png'),
  },
];

export default function HomeDienstenDisplay() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = dienstenVoorbeeld.filter((item) =>
    item.functie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (funcName) => {
    console.log(`${funcName} pressed`);
  };

  const goToDiensten = () => {
    navigation.navigate('Diensten');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.jobCount}>
        Aantal opdrachten beschikbaar: <Text style={styles.bold}>5</Text>
      </Text>
      {filteredData.map((job, index) => (
        <TouchableOpacity
          key={index}
          style={styles.jobContainer}
          onPress={() => handlePress(job.functie)}>
          <Image source={job.icoon} style={styles.icon} />
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{job.functie}</Text>
            <Text style={styles.jobDetails}>
              {job.locatie} - {job.datum}
            </Text>
            <Text style={styles.jobRate}>{job.tarief}</Text>
            <Text style={styles.jobType}>{job.type}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', right: '5%', bottom: '3%' }}
        activeOpacity={0.6}
        onPress={goToDiensten}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Zie alles 📑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: '5%',
    padding: 10,
    backgroundColor: 'white',
  },
  jobCount: {
    fontSize: 16,
    left: '2.5%',
    marginVertical: 10,
    bottom: '5%',
  },
  bold: {
    fontWeight: 'bold',
  },
  jobContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    bottom: '2.5%',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
  },
  jobRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  jobType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0057e7',
    marginTop: 5,
  },
});
