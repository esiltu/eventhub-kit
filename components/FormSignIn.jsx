import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform } from 'react-native';
import { Formik } from 'formik';
import { Input, Icon, Button } from 'react-native-elements';
import ValidationSchema from 'lib/ValidationSchema';

export default function FormSignIn() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
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
                leftIcon={<Icon name="mail" type="material" size={24} color="black" />}
                placeholder="abc@gmail.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email ? errors.email : undefined}
              />
              <Input
                leftIcon={<Icon name="lock" type="material" size={24} color="black" />}
                rightIcon={
                  <Icon
                    name={passwordVisibility ? 'visibility-off' : 'visibility'}
                    type="material"
                    size={24}
                    color="black"
                    onPress={togglePasswordVisibility}
                  />
                }
                placeholder="Password"
                secureTextEntry={passwordVisibility}
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password && errors.password ? errors.password : undefined}
              />
              <Button title="Sign In" onPress={handleSubmit} />
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
  },
  keyboardView: {
    width: '100%',
  },
});
