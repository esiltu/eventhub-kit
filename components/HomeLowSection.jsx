import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../store/storage'; // Update this path if incorrect
import { useNavigation } from '@react-navigation/native';

export default function HomeLowSection() {
  const [selectedChip, setSelectedChip] = useState('Alles');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const token = storage.getString('token');

  const navigation = useNavigation()

  const chipsData = [
    { key: 'Alles', label: 'Alles' },
    { key: 'Security', label: 'Security' },
    { key: 'Cloud', label: 'Cloud' },
    { key: 'Software', label: 'Software' },
    { key: 'Agile', label: 'Agile' },
    { key: 'Design', label: 'Design' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('/opdrachten', { token }, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.diensten) {
          setJobs(response.data.diensten);
          setFilteredJobs(response.data.diensten); // Initially show all jobs
        }
      } catch (error) {
        console.error('Error with the request:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);  // Fetch data when token changes

  const handleChipPress = (chipKey) => {
    setSelectedChip(chipKey);
    setFilteredJobs(chipKey === 'Alles' ? jobs : jobs.filter(job => job.sector === chipKey));
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(current => {
      const updated = new Set(current);
      if (updated.has(jobId)) {
        updated.delete(jobId);
      } else {
        updated.add(jobId);
      }
      return updated;
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => handlePressJobCard(item)}>
      <Image source={{ uri: item.icoon }} style={styles.logo} />
      <View style={styles.jobDetails}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.jobTitle}>{item.functie}</Text>
        <Text style={styles.jobInfo}>{`${item.tarief} - ${item.locatie}`}</Text>
        <Text style={styles.jobInfo}>{item.datum}</Text>
        <View style={styles.jobType}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleSaveJob(item.id);
          logFunctionTitle(item.functie);
        }}
        style={styles.saveIcon}>
        <Ionicons
          name={savedJobs.has(item.id) ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={savedJobs.has(item.id) ? '#ff0000' : '#888888'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handlePressJobCard = (item) => {
    navigation.navigate('DrawerRouter', {
      screen: 'JobDetailPage',
      params: {
        item,
        functieTitel: item.functie,
        icoon: item.icoon,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ height: Dimensions.get('window').height * 0.1 }}>
        <FlashList
          data={chipsData}
          renderItem={({ item }) => (
            <Chip onPress={() => handleChipPress(item.key)} style={[styles.chip, selectedChip === item.key ? styles.activeChip : styles.inactiveChip]} textStyle={selectedChip === item.key ? styles.activeText : undefined}>
              {item.label}
            </Chip>
          )}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={styles.listContent}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#f3a683" />
      ) : (
        <FlashList
          data={filteredJobs}
          renderItem={renderItem}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : `temp-id-${index}`)}
          estimatedItemSize={100}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    bottom: '19.5%',
  },
  chip: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  activeChip: {
    backgroundColor: '#f3a683',
  },
  inactiveChip: {
    backgroundColor: '#e0e0e0',
  },
  activeText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  jobCard: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    bottom: '5%',

  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  jobDetails: {
    flex: 1,
    marginLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  jobInfo: {
    fontSize: 12,
  },
  jobType: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  typeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  saveIcon: {
    padding: 5,
  },
});
