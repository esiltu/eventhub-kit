import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';

export default function HomeLowSection() {
  const [selectedChip, setSelectedChip] = useState('Alles');

  const chipsData = [
    { key: 'Alles', label: 'Alles' },
    { key: 'Security', label: 'Security' },
    { key: 'Cloud', label: 'Cloud' },
    { key: 'Software', label: 'Software' },
    { key: 'Testing', label: 'Testing' },
    { key: 'Agile', label: 'Agile' },
  ];

  const renderItem = ({ item }) => (
    <Chip
      onPress={() => setSelectedChip(item.key)}
      style={[styles.chip, selectedChip === item.key ? styles.activeChip : styles.inactiveChip]}
      textStyle={selectedChip === item.key ? styles.activeText : undefined}>
      {item.label}
    </Chip>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={chipsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    bottom: '18.5%',
    left: '2%',
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
});
