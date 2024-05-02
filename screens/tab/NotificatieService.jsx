import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Ongeldig e-mailadres').required('E-mail is verplicht'),
});

export default function NotificatieService() {
  const navigation = useNavigation();
  const token = storage.getString('token');

  async function handleSignUp(values) {
    try {
      const response = await axios.post(
        '/notificatie-service',
        { token, email: values.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        Alert.alert('Succes', 'E-mailadres succesvol opgeslagen!');
      } else {
        console.error('Fout: E-mailadres is al geregistreerd');
      }
    } catch (error) {
      Alert.alert('Fout', 'Er is iets misgegaan 😓');
    }
  }

  return (
    <SafeView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Notificatie Service</Text>
        <Text style={styles.description}>
          Meld je aan voor notificaties en ontvang updates direct in je inbox.
        </Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={handleSignUp}
          validationSchema={validationSchema}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View>
              <Input
                autoCapitalize="none"
                containerStyle={styles.inputContainer}
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Voer uw e-mailadres in"
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[styles.button, !isValid ? styles.buttonDisabled : {}]}>
                <Text style={styles.buttonText}>Aanmelden</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: '4%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2C3E50',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2C3E50',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
});
