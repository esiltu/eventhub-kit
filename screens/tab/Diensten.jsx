import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image, TextInput } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const dienstenVoorbeeld = [
  {
    dag: 'Maandag',
    datum: '10-01-2024 t/m 10-03-2024',
    locatie: 'Amsterdam',
    tarief: '€25/uur',
    type: 'Op Locatie',
    dienstverband: 'Detachering',
    functie: 'Frontend Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/github-150.png'),
    beschrijving: 'Geweldig team en cultuur.',
  },
  {
    dag: 'Dinsdag',
    datum: '11-01-2024 t/m 11-03-2024',
    locatie: 'Rotterdam',
    tarief: '€30/uur',
    type: 'Hybride',
    dienstverband: 'Freelance',
    functie: 'Backend Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/linkedin-150.png'),
    beschrijving: 'Flexibele werktijden.',
  },
  {
    dag: 'Woensdag',
    datum: '12-01-2024 t/m 12-03-2024',
    locatie: 'Utrecht',
    tarief: '€20/uur',
    type: 'Remote',
    dienstverband: 'Detachering',
    functie: 'Full Stack Ontwikkelaar',
    icoon: require('../../assets/social-media-icons/tiktok-150.png'),
    beschrijving: 'Mogelijkheid tot thuiswerken.',
  },
  {
    dag: 'Woensdag',
    datum: '12-01-2024 t/m 12-03-2024',
    locatie: 'Den Haag',
    tarief: '€20/uur',
    type: 'Remote',
    dienstverband: 'Detachering',
    functie: 'DevOps Engineer',
    icoon: require('../../assets/social-media-icons/reddit-icon-150.png'),
    beschrijving: 'Mogelijkheid tot thuiswerken.',
  },
  {
    dag: 'Woensdag',
    datum: '12-01-2024 t/m 12-03-2024',
    locatie: 'Eindhoven',
    tarief: '€20/uur',
    type: 'Remote',
    dienstverband: 'Detachering',
    functie: 'Data Scientist',
    icoon: require('../../assets/social-media-icons/whatsapp-icon-150.png'),
    beschrijving: 'Mogelijkheid tot thuiswerken.',
  },
];

export default function Diensten() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredData = dienstenVoorbeeld.filter((item) =>
    item.functie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek naar een functie... 📝"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.jobCount}>Aantal opdrachten: {filteredData.length}</Text>
      <FlashList
        data={filteredData}
        renderItem={({ item }) => {
          const scale = new Animated.Value(0.95);
          const handlePress = () => {
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }).start(() => {
              scale.setValue(0.95);
              navigation.navigate('JobDetailPage', { item });
            });
          };

          return (
            <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
              <AnimatedTouchableOpacity
                onPress={handlePress}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={0.9}>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text style={styles.functionTitle}>{item.functie}</Text>
                  <Text style={styles.time}>{item.datum}</Text>
                  <Text style={styles.location}>{item.locatie}</Text>
                  <Text style={styles.rate}>{item.tarief}</Text>
                  <Text style={styles.employmentType}>{item.dienstverband}</Text>
                  <Text style={styles.description}>{item.beschrijving}</Text>
                </View>
                <Image source={item.icoon} style={styles.iconRight} />
              </AnimatedTouchableOpacity>
            </Animated.View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  jobCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    left: '5%',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
  iconRight: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
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
  rate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  employmentType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green',
  },
  description: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  functionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
