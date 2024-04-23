import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import { Input, Icon, Button, Switch } from 'react-native-elements';
import ValidationSchema from 'lib/ValidationSchema';

export default function FormSignIn() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  async function handleSubmit(values) {
    try {
      console.log('Successfully submitted form!', values);
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  }

  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Sign in</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}>
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
                  style={{ left: '35%' }}
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
                containerStyle={{
                  bottom: '13.5%',
                  alignSelf: 'flex-end',
                  right: '16.5%',
                  backgroundColor: '#3D56F0',
                  borderRadius: 20,
                }}
                onPress={togglePasswordVisibility}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
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
    bottom: '25%',
    right: '3%',
  },
  keyboardView: {
    width: '100%',
    alignSelf: 'center',
    bottom: '29%',
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
    marginTop: 20,
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
});
