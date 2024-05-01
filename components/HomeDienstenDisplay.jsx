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
    dienstverband: 'Detachering',
    beschrijving:
      'Geweldig team en cultuur. Als Frontend Ontwikkelaar kom je te werken in een dynamisch team waarbij je direct bijdraagt aan de ontwikkeling van innovatieve webapplicaties. Je gebruikt de nieuwste technologieën om responsive, toegankelijke en visueel aantrekkelijke interfaces te bouwen.',
    bedrijfsinfo: {
      beschrijving:
        'Ons bedrijf biedt flexibele werktijden, thuiswerkmogelijkheden, een competitief salaris en een inspirerende werkomgeving.',
      marge: '6%',
      extra:
        "We vragen een marge van 6% over je uurtarief om onze diensten te dekken, inclusief HR-ondersteuning, technische middelen en carrièreontwikkelingsprogramma's.",
    },
    icoon: require('../assets/social-media-icons/github-150.png'),
  },
  {
    functie: 'Backend Ontwikkelaar',
    locatie: 'Rotterdam',
    datum: '11-01-2024 t/m 11-03-2024',
    tarief: '€30/uur',
    type: 'Hybride',
    dienstverband: 'Freelance',
    beschrijving:
      'In de rol van Backend Ontwikkelaar ben je verantwoordelijk voor het opzetten van robuuste server-oplossingen en het waarborgen van de connectiviteit tussen de server, de applicatie en de gebruikers. Jouw code zorgt voor efficiënte en veilige uitwisseling van gegevens.',
    bedrijfsinfo: {
      beschrijving:
        'Bij ons krijg je toegang tot de nieuwste technologieën en werk je samen met topexperts in jouw vakgebied.',
      marge: '6%',
      extra:
        'We hanteren een marge van 6% om onze kosten te dekken, waaronder toegang tot ons netwerk van klanten en projectondersteuning.',
    },
    icoon: require('../assets/social-media-icons/linkedin-150.png'),
  },
];

export default function HomeDienstenDisplay() {
  const navigation = useNavigation();
  const [zoekQuery, setZoekQuery] = useState('');

  const gefilterdeData = dienstenVoorbeeld.filter((item) =>
    item.functie.toLowerCase().includes(zoekQuery.toLowerCase())
  );

  const handlePress = (job) => {
    navigation.navigate('JobDetailPage', { item: job });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.aantalOpdrachten}>
        Aantal opdrachten beschikbaar: <Text style={styles.bold}>5</Text>
      </Text>
      {gefilterdeData.map((job, index) => (
        <TouchableOpacity key={index} style={styles.jobContainer} onPress={() => handlePress(job)}>
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
        onPress={() => navigation.navigate('Diensten')}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Bekijk alle opdrachten 📑</Text>
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
  aantalOpdrachten: {
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
