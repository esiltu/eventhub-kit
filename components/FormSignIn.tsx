import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import ValidationSchema from 'lib/ValidationSchema';

export default function FormSignIn() {
  return (
    <View style={styles.formHeaderContainer}>
      <Text style={styles.formHeaderTxt}>Sign in</Text>
      <KeyboardAvoidingView>
        <Formik
          onSubmit={() => console.log('something')}
          initialValues={{ email: '', password: '' }}
          validationSchema={ValidationSchema}></Formik>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  formHeaderContainer: {},
  formHeaderTxt: {
    textAlign: 'left',
    left: '10%',
    fontSize: 25,
    fontWeight: '500',
  },
});
