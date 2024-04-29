import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const dienstenVoorbeeld = [
  {
    dag: 'Maandag',
    tijd: '9:00 - 17:00',
    locatie: 'Kantoor in het centrum',
    tarief: '€25/uur',
    type: 'Kantoor',
    dienstverband: 'Detachering',
    icoon: require('../../assets/social-media-icons/github-150.png'),
    beschrijving: 'Geweldig team en cultuur.',
  },
  {
    dag: 'Dinsdag',
    tijd: '10:00 - 18:00',
    locatie: 'Stadhuis Bijgebouw',
    tarief: '€30/uur',
    type: 'Hybride',
    dienstverband: 'Freelance',
    icoon: require('../../assets/social-media-icons/linkedin-150.png'),
    beschrijving: 'Flexibele werktijden.',
  },
  {
    dag: 'Woensdag',
    tijd: '9:00 - 17:00',
    locatie: 'Thuiswerk',
    tarief: '€20/uur',
    type: 'Op afstand',
    dienstverband: 'Detachering',
    icoon: require('../../assets/social-media-icons/tiktok-150.png'),
    beschrijving: 'Mogelijkheid tot thuiswerken.',
  },
];

const Diensten = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Zoek je opdracht 📝</Text>
      <FlashList
        data={dienstenVoorbeeld}
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
                  <Text style={styles.day}>{item.dag}</Text>
                  <Text style={styles.time}>{item.tijd}</Text>
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
};

export default Diensten;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
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
});
