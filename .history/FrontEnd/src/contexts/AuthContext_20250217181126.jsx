import React, { createContext, useState, useEffect } from 'react';
import Api from '../Api/a';  // Import the Api module

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the Authorization header globally for all axios requests
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data from /api/users/me
      Api.get('/api/users/me')
        .then((response) => {
          setUser(response.data); // Set user data if token is valid
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
