import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../Api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const 
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      Api.get('/api/users/me/${user}')
        .then((response) => {
          console.log(response.data);
          setUser(response.data); // Set user data if token is valid
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          if (error.response && error.response.status === 401) {
            // If unauthorized, clear the token and prompt login
            localStorage.removeItem('token');
            setUser(null); // Ensure user is logged out
          }
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
