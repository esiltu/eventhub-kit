import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import SafeView from 'components/SafeView';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const iconSize = width * 0.15;

const ICONS = [
  {
    name: 'default',
    icon: require('../../assets/icon.png'),
  },
  {
    name: 'dark',
    icon: require('../../assets/icon-3.png'),
  },
  {
    name: 'fancy',
    icon: require('../../assets/icon-2.png'),
  },
];

export default function AppIcon() {
  const [activeIcon, setActiveIcon] = useState('default');
  const navigation = useNavigation();

  useEffect(() => {
    const loadCurrentIcon = async () => {
      const icon = await getAppIcon();
      setActiveIcon(icon);
    };
    loadCurrentIcon();
  }, []);

  async function onChangeAppIcon(icon) {
    await setAppIcon(icon);
    setActiveIcon(icon);
  }

  return (
    <SafeView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.header}>Kies App Icoon</Text>
        <View style={styles.iconContainer}>
          {ICONS.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              style={[styles.btn, activeIcon === icon.name ? styles.activeBtn : null]}
              onPress={() => onChangeAppIcon(icon.name)}>
              <Image
                source={icon.icon}
                style={[styles.iconImage, { width: iconSize, height: iconSize }]}
              />
              <Text style={styles.iconText}>{icon.name}</Text>
              {activeIcon === icon.name && (
                <Ionicons name="checkmark-circle" size={24} style={styles.checkmark} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    bottom: '20%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
    bottom: '7%',
  },
  iconContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    backgroundColor: 'white',
  },
  iconImage: {
    resizeMode: 'contain',
  },
  iconText: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
  checkmark: {
    marginRight: 15,
    color: '#5669FF',
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    left: '4%',
  },
});
