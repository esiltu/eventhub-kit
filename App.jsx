import './translation';
import axios from 'axios';
import { AuthProvider } from 'components/AuthContextProvider';
import 'react-native-gesture-handler';
import RootStack from './navigation';
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
