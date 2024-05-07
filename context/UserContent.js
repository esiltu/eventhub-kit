// Create a context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from 'store/storage';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await storage.getString('token');
      if (token) {
        setUserInfo(jwtDecode(token));
      }
      const storedUri = await storage.getString('userImage');
      if (storedUri) {
        setImageUri({ uri: storedUri });
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, imageUri, setUserInfo, setImageUri }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUser = () => useContext(UserContext);
