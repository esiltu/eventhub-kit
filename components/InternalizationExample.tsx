import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button } from './Button';

export const InternalizationExample = () => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleLanguage = (locale: 'en' | 'fr') => {
    i18n.changeLanguage(locale);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.languageChooser}>
          <Text style={styles.languageText}>Choose Language</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTextContent}>Click on a Flag: 🌎</Text>
            <TouchableOpacity onPress={() => toggleLanguage('fr')}>
              <Image
                source={require('../assets/languages-icons/frans-icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>-</Text>
            <TouchableOpacity onPress={() => toggleLanguage('en')}>
              <Image
                source={require('../assets/languages-icons/english-icon.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageChooser: {
    padding: 10,
    backgroundColor: '#6366F1',
    borderRadius: 10,
    top: '30%',
  },
  languageText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    marginTop: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalTextContent: {
    fontSize: 20,
    fontWeight: '500',
  },
  icon: {
    width: 50,
    height: 50,
    // margin: 10,
  },
});
