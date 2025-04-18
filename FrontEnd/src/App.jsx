import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./components/LoginForm";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/RegisterForm";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GroupChatPage from "./pages/GroupChatPage";
import { useState } from "react";
import GroupChatWindow from "./components/GroupChatWindow";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Terms from "./components/Terms";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('username'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));


  return (
    
    <AuthProvider>
      <Router>
    

        <Navbar token={token} userName={userName} setToken={setToken} setUserName={setUserName} />
        <Routes>
          
          <Route path="/" element={<LoginPage setToken={setToken} setUserName={setUserName} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/group-chat" element={<GroupChatPage />} />
           <Route path="/chat" element={<ChatPage />} />
           <Route path="/group/:groupId" element={<GroupChatWindow />} />
          <Route path="/login" element={<LoginPage setToken={setToken} setUserName={setUserName} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
        <Footer userName={userName}/>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
};

export default App;
