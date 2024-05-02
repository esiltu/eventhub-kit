import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storage } from 'store/storage';

export default function HomeDienstenDisplay() {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = storage.getString('token');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          '/opdrachten',
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.setLogginIn) {
          setJobs(response.data.diensten.slice(0, 2));
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error with the request:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = (job) => {
    navigation.navigate('JobDetailPage', { item: job });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        jobs.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={styles.jobContainer}
            onPress={() => handlePress(job)}>
            <Image source={{ uri: job.icoon }} style={styles.icon} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.functie}</Text>
              <Text style={styles.jobDetails}>
                {job.locatie} - {job.datum}
              </Text>
              <Text style={styles.jobRate}>{job.tarief}</Text>
              <Text style={styles.jobType}>{job.type}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: '5%',
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  jobContainer: {
    width: '92.5%',
    alignSelf: 'center',
    bottom: '3%',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
  },
  jobRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  jobType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0057e7',
    marginTop: 5,
  },
});
