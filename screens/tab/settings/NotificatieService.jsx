import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeView from 'components/SafeView';
import { storage } from 'store/storage';
import Toast from 'react-native-toast-message';

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
      Toast.show({
        type: 'error',
        text1: 'Fout',
        text2: 'E-mailadres is al geregistreerd',
      });
      console.log('Fout: E-mailadres is al geregistreerd');
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
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
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
    justifyContent: 'center',
    padding: 20,
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    bottom: '36%',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    right: '4%',
    marginBottom: 16,
    width: '80%',
    bottom: '20%',
  },
  formContainer: {
    bottom: '20%',
    width: '90%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#f3a683',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
});
