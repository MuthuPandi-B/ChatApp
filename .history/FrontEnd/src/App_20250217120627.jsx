import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
