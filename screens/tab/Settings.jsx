import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import SafeView from 'components/SafeView';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsOptions = [
  {
    id: 'appIcon',
    title: 'Kies App Icoon',
    icon: 'image-outline',
    navigateTo: 'AppIcon',
  },
  {
    id: 'userInfo',
    title: 'Profiel Inzien',
    icon: 'person-circle-outline',
    navigateTo: 'UserInfo',
  },
  {
    id: 'bestandenFlexWerker',
    title: 'Bestanden Flexwerker',
    icon: 'briefcase-outline',
    navigateTo: 'BestandenWerker',
  },
  {
    id: 'notificiatieService',
    title: 'Notificatie Service',
    icon: 'notifications-outline',
    navigateTo: 'NotificatieService',
  },
];

export default function Settings() {
  const navigation = useNavigation();

  const handlePress = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress(item.navigateTo)}
      activeOpacity={0.8}>
      <Ionicons name={item.icon} size={24} color="#4F4F4F" />
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.header}>Instellingen</Text>
        <FlashList
          data={SettingsOptions}
          renderItem={renderItem}
          estimatedItemSize={55}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: '600',
  },
  listContentContainer: {
    paddingBottom: 20,
    paddingTop: 10,
    // backgroundColor: 'transparent',
    // borderRadius: 15,
  },
});
