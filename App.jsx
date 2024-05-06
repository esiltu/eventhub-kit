import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { AuthProvider } from 'components/AuthContextProvider';
import 'react-native-gesture-handler';
import * as QuickActions from 'expo-quick-actions';
import RootStack from './navigation';
import 'react-native-gesture-handler';
import { decode as atob } from 'base-64';
global.atob = atob;

axios.defaults.baseURL = 'https://esdevelops.pro';

export default function App() {
  useEffect(() => {
    QuickActions.setItems([
      {
        title: 'Wacht! Niet wissen!',
        subtitle: 'We zijn hier om te helpen',
        icon: Platform.OS === 'ios' ? 'symbol:person.crop.circle.badge.questionmark' : undefined,
        id: '0',
        params: { href: '/help' },
      },
    ]);
  }, []);
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
