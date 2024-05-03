import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storage } from 'store/storage';
import SafeView from 'components/SafeView';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Diensten() {
  const [diensten, setDiensten] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const token = storage.getString('token');

  useEffect(() => {
    fetchData();
  }, [token]);

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
      if (response.data.diensten) {
        setDiensten(response.data.diensten);
      } else {
        console.error('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.error('Error with the request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getShortDescription = (description) => {
    return `${description.substring(0, 25)}...`;
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handlePress = (item) => {
    navigation.navigate('JobDetailPage', {
      item,
      functieTitel: item.functie,
      icoon: item.icoon,
    });
  };

  useEffect(() => {
    if (!isLoading && diensten.length === 0) {
      Alert.alert(
        'Helaas geen nieuwe opdrachten beschikbaar',
        'Meld je aan voor notificatie inbox voor nieuwe opdrachten'
      );
    }
  }, [isLoading, diensten]);

  return (
    <SafeView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Zoek naar een functie... 📝"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Verversen</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#f3a683" />
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={styles.jobCount}>
              Aantal opdrachten:{' '}
              {
                diensten.filter((item) =>
                  item.functie.toLowerCase().includes(searchQuery.toLowerCase())
                ).length
              }
            </Text>
            <FlashList
              data={diensten.filter((item) =>
                item.functie.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              renderItem={({ item }) => {
                const scale = new Animated.Value(0.95);

                return (
                  <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
                    <AnimatedTouchableOpacity
                      onPress={() => handlePress(item)}
                      style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                      activeOpacity={0.9}>
                      <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Text style={styles.functionTitle}>{item.functie}</Text>
                        <Text style={styles.time}>{item.datum}</Text>
                        <Text style={styles.location}>{item.locatie}</Text>
                        <Text style={styles.rate}>{item.tarief}</Text>
                        <Text style={styles.employmentType}>{item.dienstverband}</Text>
                        <Text style={styles.description}>
                          {getShortDescription(item.beschrijving)}
                        </Text>
                      </View>
                      <Image source={{ uri: item.icoon }} style={styles.iconRight} />
                    </AnimatedTouchableOpacity>
                  </Animated.View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              estimatedItemSize={40}
            />
          </View>
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  refreshButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f3a683',
    borderRadius: 5,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  jobCount: {
    left: '1%',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 4,
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
  functionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
