import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FunctionComponent,
} from 'react';
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

  useEffect(() => {
    const verifyToken = async () => {
      const token = storage.getString('token');
      if (token) {
        try {
          const response = await axios.post(
            '/jwt-verify',
            { token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoggedIn(true);
          console.log('Token verified:', response.data);
        } catch (error) {
          console.error('Error verifying token:', error);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
