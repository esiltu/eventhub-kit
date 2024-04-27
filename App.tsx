import './translation';
import axios from 'axios';
import { AuthProvider } from 'components/AuthContextProvider';

import 'react-native-gesture-handler';

import RootStack from './navigation';

axios.defaults.baseURL = 'http://localhost:3000/';

export default function App() {
  return (
    <AuthProvider>
      <RootStack />
    </AuthProvider>
  );
}
