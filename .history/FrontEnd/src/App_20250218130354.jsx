import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/RegisterForm";
import GroupChat from "./components/GroupChat";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GroupChatPage from "./pages/GroupChatPage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/group-chat" element={<GroupChatPage />} />
           <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
};

export default App;
