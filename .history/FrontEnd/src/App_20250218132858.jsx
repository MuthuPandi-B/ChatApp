import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/RegisterForm";
import GroupChat from "./components/GroupChat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GroupChatPage from "./pages/GroupChatPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('username'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setToken(null);
    setUserName(null);
    setUserId(null);
    na
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar token={token} userName={userName}  onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LoginPage setToken={setToken} setUserName={setUserName} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/group-chat" element={<GroupChatPage />} />
           <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} setUserName={setUserName} />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
