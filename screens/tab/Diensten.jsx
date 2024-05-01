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
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { storage } from 'store/storage';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Diensten() {
  const [diensten, setDiensten] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
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

    fetchData();
  }, [token]);

  const getShortDescription = (description) => {
    return `${description.substring(0, 25)}...`;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek naar een functie... 📝"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#f3a683" />
        </View>
      ) : (
        <>
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
              const handlePress = () => {
                Animated.spring(scale, {
                  toValue: 1,
                  useNativeDriver: true,
                }).start(() => {
                  scale.setValue(0.95);
                  navigation.navigate('JobDetailPage', { item, functieTitel: item.functie });
                });
              };

              return (
                <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
                  <AnimatedTouchableOpacity
                    onPress={handlePress}
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
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  jobCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    left: '5%',
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
