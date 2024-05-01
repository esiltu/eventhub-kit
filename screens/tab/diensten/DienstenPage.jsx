import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import SafeView from 'components/SafeView';
import { useNavigation } from '@react-navigation/native';

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

    const handleCancel = () => {
      console.log('Reageren geannuleerd');
    };

    const handleConfirm = () => {
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
    };

    const buttons = [
      { text: 'Nee', onPress: handleCancel, style: 'cancel' },
      { text: 'Ja', onPress: handleConfirm },
    ];

    Alert.alert(title, message, buttons);
  };

  const details = [
    { label: 'Icoon', value: item.icoon, type: 'icon' },
    { label: 'Functie', value: item.functie, type: 'title' },
    { label: 'Type', value: item.type, type: 'type' },
    { label: 'Datum', value: item.datum, type: 'attribute' },
    { label: 'Locatie', value: item.locatie, type: 'attribute' },
    { label: 'Tarief', value: `Tarief: ${item.tarief}`, type: 'attribute' },
    { label: 'Beschrijving', value: item.beschrijving, type: 'description' },
    { label: 'Wat bieden wij', value: item.bedrijfsinfo?.beschrijving, type: 'description' },
    { label: 'Extra Info', value: item.bedrijfsinfo?.extra, type: 'description' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>{item.value}</Text>;
      case 'type':
        return (
          <View
            style={[
              styles.typeBadge,
              item.value === 'Op Locatie' ? styles.onSite : styles.typeBadge,
            ]}>
            <Ionicons name="business" size={16} color="white" />
            <Text style={styles.typeText}>{item.value}</Text>
          </View>
        );
      case 'attribute':
      case 'description':
        return (
          <Text style={item.type === 'attribute' ? styles.attribute : styles.description}>
            {item.value}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeView>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: item.icoon }} style={styles.icon} />
      <FlashList
        data={details}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        estimatedItemSize={100}
      />
      <TouchableOpacity style={styles.button} onPress={applyForJob}>
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={styles.buttonText}>Reageer Nu</Text>
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
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    left: '4%',
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    // left: '2%',
    alignSelf: 'center',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 10,
    width: '50%',
    // left: '5%',
    alignSelf: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    textAlign: 'center',
  },
  attribute: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    left: '7%',
  },
  description: {
    fontSize: 14,
    alignSelf: 'center',
    // fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    width: '85%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    width: '50%',
    alignSelf: 'center',
    bottom: '20%',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});
