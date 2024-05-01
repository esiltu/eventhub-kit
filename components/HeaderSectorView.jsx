import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Import icons
import IconAgile from '../assets/home-icons/icon-agile.png';
import IconCloud from '../assets/home-icons/icon-cloud.png';
import IconCyber from '../assets/home-icons/icon-cybersecurity.png';
import IconSoftware from '../assets/home-icons/icon-softwaredevelopment.png';
import IconSupport from '../assets/home-icons/icon-support.png';
import IconTesting from '../assets/home-icons/icon-testing.png';

export default function HeaderSectorView() {
  const navigation = useNavigation();

  const icons = [
    { name: 'Agile', source: IconAgile },
    { name: 'Cloud', source: IconCloud },
    { name: 'Cyber', source: IconCyber },
    { name: 'Software', source: IconSoftware },
    { name: 'Support', source: IconSupport },
    { name: 'Testing', source: IconTesting },
  ];

  const handlePress = (iconName) => {
    console.log(`${iconName} pressed`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconGrid}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            style={styles.iconWrapper}
            onPress={() => handlePress(icon.name)}>
            <Image source={icon.source} style={styles.icon} />
            <Text style={styles.iconText}>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    top: '7.5%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    margin: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  iconWrapper: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 70,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
});
