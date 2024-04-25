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
import { Input, Icon, Button } from 'react-native-elements';
import ValidationSchemaSignUp from 'lib/ValidationSchemaSignUp';
import { useNavigation } from '@react-navigation/native';

export default function FormSignUp() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  async function handleSubmit(values) {
    console.log('Form Values:', values);
    try {
      console.log('Successfully submitted form!', values);
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  }

  function googleSignInButton() {
    try {
      console.log('Google Sign In Coming Soon!');
    } catch (error) {
      console.log(error);
    }
  }

  function facebookSignIn() {
    try {
      console.log('Facebook Sign In Coming Soon!');
    } catch (error) {
      console.log(error);
    }
  }

  function goBackToSignIn() {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Sign Up</Text>
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
                autoCapitalize="words"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.fullName && errors.fullName ? errors.fullName : undefined}
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
                placeholder="Password"
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                inputContainerStyle={styles.inputContainer}
                errorMessage={touched.password && errors.password ? errors.password : undefined}
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
                errorMessage={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
              />
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
      <View style={{ bottom: '22.5%' }}>
        <Text style={styles.dontAccTxt}>
          Already have an account?{' '}
          <TouchableOpacity activeOpacity={0.6} onPress={goBackToSignIn}>
            <Text style={styles.signUpBtn}>Sign In</Text>
          </TouchableOpacity>
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
  iconForwardContainer: {
    bottom: '11%',
    alignSelf: 'flex-end',
    right: '16.5%',
    backgroundColor: '#3D56F0',
    borderRadius: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  googleLoginBtn: {
    backgroundColor: '#EDE5E5',
    borderRadius: 20,
    paddingHorizontal: '20%',
    height: '22.5%',
    margin: 10,
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLoginBtnImage: {
    width: 70,
    height: 70,
    right: '70%',
    top: '20%',
  },
  googleTxt: {
    textAlign: 'center',
    bottom: '55%',
    fontSize: 20,
    left: '10%',
    fontWeight: 'bold',
  },
  dontAccTxt: {
    fontSize: 18,
    fontWeight: '500',
  },
  signUpBtn: {
    color: '#5669FF',
    fontSize: 18,
    top: '15%',
    fontWeight: '500',
  },
  // Add any additional styles here
});
