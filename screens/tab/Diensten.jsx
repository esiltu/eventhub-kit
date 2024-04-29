import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const dienstenVoorbeeld = [
  {
    day: 'Maandag',
    time: '9:00 AM - 5:00 PM',
    location: 'Downtown Office',
    rate: '€25/uur',
    type: 'Kantoor',
    employmentType: 'Detachering',
    icon: require('../../assets/social-media-icons/github-150.png'), // Using require here
    description: 'Great team and culture.',
  },
  {
    day: 'Dinsdag',
    time: '10:00 AM - 6:00 PM',
    location: 'City Hall Annex',
    rate: '€30/uur',
    type: 'Hybride',
    employmentType: 'Freelance',
    icon: require('../../assets/social-media-icons/linkedin-150.png'), // Using require here
    description: 'Flexible working hours.',
  },
  {
    day: 'Woensdag',
    time: '9:00 AM - 5:00 PM',
    location: 'Remote',
    rate: '€20/uur',
    type: 'Op afstand',
    employmentType: 'Detachering',
    icon: require('../../assets/social-media-icons/tiktok-150.png'), // Using require here
    description: 'Remote work opportunity.',
  },
];

const Diensten = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Zoek je opdracht</Text>
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
                  <Text style={styles.day}>{item.day}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.rate}>{item.rate}</Text>
                  <Text style={styles.employmentType}>{item.employmentType}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Image source={item.icon} style={styles.iconRight} />
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
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
