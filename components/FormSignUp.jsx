import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import { Input, Icon } from 'react-native-elements';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const ValidationSchemaSignUp = Yup.object().shape({
  fullName: Yup.string().required('Volledige naam is verplicht'),
  email: Yup.string().email('Ongeldig e-mailadres').required('E-mailadres is verplicht'),
  password: Yup.string().required('Wachtwoord is verplicht'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Wachtwoorden moeten overeenkomen')
    .required('Bevestig het wachtwoord'),
});

export default function FormSignUp() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (values, { resetForm }) => {
    axios({
      url: '/register',
      method: 'POST',
      data: {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data);
        Toast.show({
          type: 'success',
          text1: `${response.data.bericht + ' ✅'}`,
          text1Style: { textAlign: 'center' },
        });
        resetForm();
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function goBackToSignIn() {
    try {
      navigation.goBack();
    } catch (error) {
      console.log('Error going back to sign in:', error);
    }
  }

  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Registreren</Text>
      <View style={{ bottom: '17.5%', alignSelf: 'flex-start' }}>
        <TouchableOpacity
          onPress={goBackToSignIn}
          activeOpacity={0.6}
          style={{ top: '10%', left: '6.5%', top: '35%' }}>
          <Ionicons name="arrow-back-circle-outline" size={50} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <Formik
          initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchemaSignUp}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                leftIcon={<Icon name="person" type="material" size={24} color="#807A7A" />}
                placeholder="Voor en achternaam"
                autoCapitalize="none"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.fullName && errors.fullName}
              />
              <Input
                leftIcon={<Icon name="mail" type="material" size={24} color="#807A7A" />}
                placeholder="Email-address"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.email && errors.email}
              />
              <Input
                leftIcon={<Icon name="lock" type="material" size={24} color="#807A7A" />}
                rightIcon={
                  <Icon
                    name={passwordVisibility ? 'visibility-off' : 'visibility'}
                    type="material"
                    size={24}
                    color="#807A7A"
                    onPress={togglePasswordVisibility}
                  />
                }
                placeholder="Wachtwoord"
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.password && errors.password}
              />
              <Input
                leftIcon={<Icon name="lock" type="material" size={24} color="#807A7A" />}
                rightIcon={
                  <Icon
                    name={passwordVisibility ? 'visibility-off' : 'visibility'}
                    type="material"
                    size={24}
                    color="#807A7A"
                    onPress={togglePasswordVisibility}
                  />
                }
                placeholder="Bevestig wachtwoord"
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.buttonStyle}
                activeOpacity={0.6}>
                <Text style={styles.buttonTitleStyle}>Registreer</Text>
              </TouchableOpacity>
              <Icon
                name={'arrow-forward'}
                type="ionicons"
                size={35}
                color="white"
                containerStyle={styles.iconForwardContainer}
                onPress={togglePasswordVisibility}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <View style={{ bottom: '10%' }}>
        <Text style={styles.dontAccTxt}>
          Heb je al een account?{' '}
          <TouchableOpacity activeOpacity={0.6} onPress={goBackToSignIn}>
            <Text style={styles.signUpBtn}>Log nu in!</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpBtn: {
    color: '#f3a683',
    fontSize: 18,
    top: '15%',
    fontWeight: '500',
  },
  dontAccTxt: {
    top: '50%',
    fontSize: 18,
    fontWeight: '500',
  },
  formHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeaderTxt: {
    fontSize: 25,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginHorizontal: '10%',
    marginBottom: '5%',
    right: '3%',
    top: '0%',
  },
  keyboardView: {
    width: '100%',
    alignSelf: 'center',
    bottom: '9%',
    padding: 10,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#E4DFDF',
    borderRadius: 10,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
  },
  iconForwardContainer: {
    bottom: '6%',
    alignSelf: 'flex-end',
    right: '16.5%',
    backgroundColor: '#ECCABB',
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: '#f3a683',
    borderRadius: 20,
    height: 60,
    width: '80%',
    alignSelf: 'center',
    top: '5%',
  },
  buttonTitleStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    top: '30%',
  },
});
