import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storage } from 'store/storage';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

export default function HomeDienstenDisplay() {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const token = storage.getString('token');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          '/opdrachten',
          { token },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.setLogginIn) {
          setJobs(response.data.diensten.slice(0, 3));
        }
      } catch (error) {
        console.error('Error with the request:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((current) => {
      const updated = new Set(current);
      updated.has(jobId) ? updated.delete(jobId) : updated.add(jobId);
      return updated;
    });
  };

  const handlePressJobCard = (item) => {
    navigation.navigate('JobDetailPage', {
      item: item,
      functieTitel: item.functie,
      icoon: item.icoon,
    });
  };

  const logFunctionTitle = (title) => {
    console.log('Pressed on Ionicon for:', title);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => handlePressJobCard(item)}>
      <Image source={{ uri: item.icoon }} style={styles.logo} />
      <View style={styles.jobDetails}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.jobTitle}>{item.functie}</Text>
        <Text style={styles.jobInfo}>{`${item.tarief} - ${item.locatie}`}</Text>
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={{ fontSize: 20, left: '6%', fontWeight: '300', color: 'black' }}>
            Nieuwste Opdrachten
          </Text>
          <FlashList
            data={jobs}
            renderItem={renderItem}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : `temp-id-${index}`)}
            estimatedItemSize={320}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 10, backgroundColor: 'white' }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: '2.5%',
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  jobCard: {
    width: 300,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  jobDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 14,
  },
  jobInfo: {
    fontSize: 12,
  },
  jobType: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    width: 80,
    marginTop: 4,
  },
  typeText: {
    fontSize: 12,
    color: '#333',
  },
  saveIcon: {
    padding: 5,
  },
});
