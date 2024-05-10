import React from 'react';
import axios from 'axios';
import { AuthProvider } from 'context/AuthContextProvider';
import 'react-native-gesture-handler';
import RootStack from './navigation';
import 'react-native-gesture-handler';
import { decode as atob } from 'base-64';
global.atob = atob;

axios.defaults.baseURL = 'https://esdevelops.pro';


export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
