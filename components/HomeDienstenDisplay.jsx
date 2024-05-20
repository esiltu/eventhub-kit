import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storage } from 'store/storage';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function HomeDienstenDisplay() {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const token = storage.getString('token');

  // loading the fonts
  const [fontsLoaded, fontError] = useFonts({
    'DynaPuff-Regular': require('../assets/fonts/DynaPuff-Regular.ttf')
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          '/opdrachten',
          { token },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.diensten) {
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
    navigation.navigate('DrawerRouter', {
      screen: 'JobDetailPage',
      params: {
        item,
        functieTitel: item.functie,
        icoon: item.icoon,
      },
    });
  };

  function goToDienstenPage() {
    try {
      navigation.navigate('Diensten');
    } catch (error) {
      console.log(error);
    }
  }

  const logFunctionTitle = (title) => {
    console.log('Pressed on Ionicon for:', title);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => handlePressJobCard(item)} activeOpacity={0.6}>
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

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#f3a683" />
      ) : (
        <>
          <Text
            style={{ fontSize: 18, left: '5.5%', fontWeight: '400', color: 'black', top: '6.5%', fontFamily: 'DynaPuff-Regular' }}>
            Aanbevolen voor jou
          </Text>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', bottom: '2.5%', right: '4%' }}
            activeOpacity={0.6}
            onPress={goToDienstenPage}>
            <Text style={{ fontSize: 18, color: '#007AFF', fontWeight: '600', fontFamily: 'DynaPuff-Regular' }}>Zie alles</Text>
          </TouchableOpacity>
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
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    bottom: '3%',
  },
  jobCard: {
    bottom: '1%',
    width: 300,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
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
    fontWeight: 'bold',
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
