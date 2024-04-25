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

const ValidationSchemaSignUp = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function FormSignUp() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
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
      <Text style={styles.formHeaderTxt}>Sign Up</Text>
      <View style={{ bottom: '17.5%', alignSelf: 'flex-start' }}>
        <TouchableOpacity
          onPress={goBackToSignIn}
          activeOpacity={0.6}
          style={{ top: '10%', left: '6.5%' }}>
          <Image source={require('../assets/icons/icon-go-back.png')} />
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
                placeholder="Full Name"
                autoCapitalize="none"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.fullName && errors.fullName}
              />
              <Input
                leftIcon={<Icon name="mail" type="material" size={24} color="#807A7A" />}
                placeholder="Email Address"
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
                placeholder="Password"
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
                placeholder="Confirm Password"
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
                <Text style={styles.buttonTitleStyle}>SIGN UP</Text>
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
          Already have an account?{' '}
          <TouchableOpacity activeOpacity={0.6} onPress={goBackToSignIn}>
            <Text style={styles.signUpBtn}>Sign In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={removeHasSeenOnboarding}>
            <Text>Remove seen MKVV key</Text>
          </TouchableOpacity> */}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpBtn: {
    color: '#5669FF',
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
    bottom: '0%',
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
    backgroundColor: '#3D56F0',
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: '#5669FF',
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
