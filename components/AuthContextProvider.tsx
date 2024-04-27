import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FunctionComponent,
} from 'react';
import { MMKV } from 'react-native-mmkv';

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
    const token = storage.getString('token');
    setLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
