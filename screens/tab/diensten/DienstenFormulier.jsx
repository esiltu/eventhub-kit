// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import SafeView from 'components/SafeView';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import * as DocumentPicker from 'expo-document-picker';

// const validationSchema = Yup.object({
//   fullName: Yup.string().required('Voornaam en achternaam zijn verplicht'),
//   email: Yup.string().email('Ongeldig e-mailadres').required('E-mail is verplicht'),
//   phoneNumber: Yup.string(),
//   file: Yup.mixed().required('CV is vereist'),
//   maxRate: Yup.number().required('Uurtarief is verplicht').positive().integer(),
//   agreeTerms: Yup.bool().oneOf([true], 'U moet akkoord gaan met de voorwaarden'),
// });

// export default function DienstenFormulier() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { jobTitle } = route.params;

//   const handleFileSelection = async (setFieldValue) => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: '*/*',
//       copyToCacheDirectory: true,
//     });
//     if (result.type === 'success') {
//       setFieldValue('file', result.uri);
//     } else {
//       console.log('Geen bestand geselecteerd');
//     }
//   };

//   return (
//     <SafeView>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerTitle}>{jobTitle}</Text>
//           <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={30} color="black" />
//           </TouchableOpacity>
//         </View>
//         <Formik
//           initialValues={{
//             fullName: '',
//             email: '',
//             phoneNumber: '',
//             file: undefined,
//             maxRate: '',
//             agreeTerms: false,
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log('Formulier verzonden', values);
//             console.log('Opdracht naam:', jobTitle);
//             navigation.goBack();
//           }}>
//           {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
//             <View style={styles.formContainer}>
//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('fullName')}
//                 onBlur={handleBlur('fullName')}
//                 value={values.fullName}
//                 placeholder="Voor- en achternaam"
//               />
//               {touched.fullName && errors.fullName && (
//                 <Text style={styles.errorText}>{errors.fullName}</Text>
//               )}

//               <TextInput
//                 style={styles.input}
//                 autoCapitalize="none"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//                 placeholder="E-mailadres"
//               />
//               {touched.email && errors.email && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}

//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('phoneNumber')}
//                 onBlur={handleBlur('phoneNumber')}
//                 value={values.phoneNumber}
//                 placeholder="Optioneel telefoonnummer"
//               />
//               {touched.phoneNumber && errors.phoneNumber && (
//                 <Text style={styles.errorText}>{errors.phoneNumber}</Text>
//               )}

//               <TouchableOpacity
//                 onPress={() => handleFileSelection(setFieldValue)}
//                 style={styles.uploadButton}>
//                 <Ionicons name="cloud-upload-outline" size={24} color="blue" />
//                 <Text> Selecteer bestand</Text>
//               </TouchableOpacity>
//               {touched.file && errors.file && <Text style={styles.errorText}>{errors.file}</Text>}

//               <TextInput
//                 style={styles.input}
//                 onChangeText={handleChange('maxRate')}
//                 onBlur={handleBlur('maxRate')}
//                 value={values.maxRate}
//                 placeholder="Uurtarief (naar wens)"
//               />
//               {touched.maxRate && errors.maxRate && (
//                 <Text style={styles.errorText}>{errors.maxRate}</Text>
//               )}

//               <TouchableOpacity
//                 style={styles.checkboxContainer}
//                 onPress={() => setFieldValue('agreeTerms', !values.agreeTerms)}>
//                 <Ionicons
//                   name={values.agreeTerms ? 'checkbox' : 'square-outline'}
//                   size={24}
//                   color="green"
//                 />
//                 <Text style={styles.checkboxLabel}>Geen bemiddelaar/bureau</Text>
//               </TouchableOpacity>
//               {touched.agreeTerms && errors.agreeTerms && (
//                 <Text style={styles.errorText}>{errors.agreeTerms}</Text>
//               )}

//               <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>Verstuur Reactie</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>
//       </KeyboardAvoidingView>
//     </SafeView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     bottom: '2%',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     top: '40%',
//     // left: '2.5%',
//   },
//   formContainer: {
//     flex: 1,
//     padding: 20,
//     bottom: '2%',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 5,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkboxLabel: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   checkedCheckbox: {
//     backgroundColor: 'green',
//   },
//   goBackButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//     left: '4%',
//   },
// });
