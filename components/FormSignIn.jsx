import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { Input, Icon, Button, Switch } from 'react-native-elements';
import ValidationSchemaSignIn from 'lib/ValidationSchemaSignIn';
import { useNavigation } from '@react-navigation/native';
import { storage } from 'store/storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useAuth } from './AuthContextProvider';

export default function FormSignIn() {
  const doesTokenExist = storage.getString('token');
  console.log('Does token exist:', doesTokenExist);
  const doesKeyExit = storage.contains('hasSeenOnboarding');
  console.log('Has seen onboarding:', doesKeyExit);
  const navigation = useNavigation();
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const { setLoggedIn } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (values, { resetForm }) => {
    axios({
      url: '/login',
      method: 'POST',
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response.data);
        storage.set('token', response.data.token);
        Toast.show({
          type: 'success',
          text1: `${response.data.message + ' ✅'}`,
          text1Style: { textAlign: 'center' },
        });
        setLoggedIn(true);
        resetForm();
      })
      .catch((error) => {
        console.log(error.response.data);
        Toast.show({
          type: 'error',
          text1: `${error.response.data.message + ' ❌'}`,
          text1Style: { textAlign: 'center' },
        });
      });
  };

  // This is in case you want to remove the key from storage
  // function removeHasSeenOnboarding() {
  //   try {
  //     storage.delete('hasSeenOnboarding');
  //     console.log('Successfully removed hasSeenOnboarding!');
  //   } catch (error) {
  //     console.log('Error removing hasSeenOnboarding:', error);
  //   }
  // }

  function googleSignInButton() {
    try {
      console.log('Google Sign In Coming Soon!');
    } catch (error) {
      console.log(error);
    }
  }

  function dontHaveAnAccount() {
    try {
      navigation.navigate('SignUp');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Inloggen</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchemaSignIn}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                leftIcon={<Icon name="mail" type="material" size={24} color="#807A7A" />}
                placeholder="abc@gmail.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.email && errors.email ? errors.email : undefined}
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
                errorMessage={touched.password && errors.password ? errors.password : undefined}
              />
              <View style={styles.switchContainer}>
                <Switch
                  value={rememberMe}
                  onValueChange={toggleRememberMe}
                  color="#f3a683"
                  style={styles.switchStyle}
                />
                <Text style={styles.switchLabel}>Onthoud mij</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.forgotPasswordStyle}>
                  <Text style={styles.forgotPasswordStyleTxt}>Wachtwoord vergeten?</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="Inloggen"
                onPress={handleSubmit}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
              />
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
      {/* <Text style={styles.orTxt}>OF</Text>
      <View style={styles.viewOther}>
        <TouchableOpacity style={styles.facebookLoginBtn} activeOpacity={0.6}>
          <Image
            source={require('../assets/auth-icons/logininwithfacebook.png')}
            style={styles.facebookLoginBtnImage}
          />
          <Text style={styles.facebookTxt}>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookLoginBtn} activeOpacity={0.6}>
          <Image
            source={require('../assets/auth-icons/logininwithgoogle.png')}
            style={styles.facebookLoginBtnImage}
          />
          <Text style={styles.facebookTxt}>Login with Google</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ bottom: '22.5%' }}>
        <Text style={styles.dontAccTxt}>
          Geen account?{' '}
          <TouchableOpacity activeOpacity={0.6} onPress={dontHaveAnAccount}>
            <Text style={styles.signUpBtn}>Registreer!</Text>
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
    bottom: '23.5%',
    right: '3%',
  },
  keyboardView: {
    width: '100%',
    alignSelf: 'center',
    bottom: '27.5%',
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
  buttonStyle: {
    backgroundColor: '#f3a683',
    borderRadius: 20,
    height: 60,
    marginTop: 0,
    width: '80%',
    alignSelf: 'center',
  },
  buttonTitleStyle: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    left: '40%',
    color: '#120D26',
  },
  forgotPasswordStyle: {
    bottom: '185%',
    alignSelf: 'flex-end',
  },
  forgotPasswordStyleTxt: {
    fontSize: 16,
    color: '#120D26',
  },
  iconForwardContainer: {
    bottom: '13.5%',
    alignSelf: 'flex-end',
    right: '16.5%',
    backgroundColor: '#ECCABB',
    borderRadius: 20,
  },
  switchStyle: {
    left: '35%',
  },
  signUpBtn: {
    color: '#f3a683',
    fontSize: 18,
    top: '15%',
    fontWeight: '500',
  },
  dontAccTxt: {
    bottom: '125%',
    fontSize: 18,
    fontWeight: '500',
  },
});
