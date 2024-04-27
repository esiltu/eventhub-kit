import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FunctionComponent,
} from 'react';
import { storage } from 'store/storage'; // Ensure this path matches your storage utility

// Define the type for the context value
interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

// Create the context with default values and explicit types
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {}, // Default function
});

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);

// Props type for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token is stored and set the logged-in state accordingly
    const token = storage.getString('token');
    setLoggedIn(!!token); // !! converts a value to boolean, true if token exists
  }, []);

  // Provide isLoggedIn and setLoggedIn to the context consumers
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>
  );
};
