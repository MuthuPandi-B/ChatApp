import React, { createContext, useState, useEffect } from 'react';
import Api from '../Api/api';  // Import the Api module

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token in localStorage:', token);

    if (token) {
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data from /api/users/me
      Api.get('/api/users/me')
        .then((response) => {
          console.log('Response from /api/users/me:', response.data);
          setUser(response.data); // Set user data if token is valid
        })
        .catch((error) => {
          console.error('Error fetching user:', error.response || error);
          if (error.response && error.response.status === 401) {
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
