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
        console.log(error);
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
      <Text style={styles.formHeaderTxt}>Sign In</Text>
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
                placeholder="Your password"
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
                  color="#5669FF"
                  style={styles.switchStyle}
                />
                <Text style={styles.switchLabel}>Remember me</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.forgotPasswordStyle}>
                  <Text style={styles.forgotPasswordStyleTxt}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="SIGN IN"
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
      <Text style={styles.orTxt}>OR</Text>
      {/* Other methods for Sign In *OPTIONAL* */}
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
      </View>
      <View style={{ bottom: '22.5%' }}>
        <Text style={styles.dontAccTxt}>
          Don't have an account?{' '}
          <TouchableOpacity activeOpacity={0.6} onPress={dontHaveAnAccount}>
            <Text style={styles.signUpBtn}>Sign Up</Text>
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
    top: '0%',
    right: '3%',
  },
  keyboardView: {
    width: '100%',
    alignSelf: 'center',
    bottom: '3.5%',
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
    backgroundColor: '#5669FF',
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
    backgroundColor: '#3D56F0',
    borderRadius: 20,
  },
  switchStyle: {
    left: '35%',
  },
  orTxt: {
    textAlign: 'center',
    fontSize: 20,
    color: '#9D9898',
    bottom: '7.5%',
    fontWeight: '500',
  },
  facebookLoginBtn: {
    backgroundColor: '#EDE5E5',
    borderRadius: 20,
    paddingHorizontal: '20%',
    height: '22.5%',
    margin: 10,
    bottom: '5%',
    marginBottom: '0%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOther: {
    bottom: '5%',
  },
  facebookLoginBtnImage: {
    width: 70,
    height: 70,
    right: '70%',
    top: '20%',
  },
  facebookTxt: {
    textAlign: 'center',
    bottom: '55%',
    fontSize: 20,
    left: '10%',
    fontWeight: 'bold',
  },
  signUpBtn: {
    color: '#5669FF',
    fontSize: 18,
    top: '15%',
    fontWeight: '500',
  },
  dontAccTxt: {
    fontSize: 18,
    fontWeight: '500',
  },
});
