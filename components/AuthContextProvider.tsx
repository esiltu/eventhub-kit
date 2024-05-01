import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FunctionComponent,
} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import axios from 'axios';

const storage = new MMKV();

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = storage.getString('token');
      if (token) {
        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Verification timeout')), 5000)
          );

          const tokenVerificationPromise = axios.post(
            '/jwt-verify',
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await Promise.race([tokenVerificationPromise, timeoutPromise]);

          setLoggedIn(true);
          console.log('Token verified');
        } catch (error) {
          console.error('Error verifying token:', error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
