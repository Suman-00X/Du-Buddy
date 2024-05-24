import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import SessionRequest from './pages/SessionRequest';
import Profile from './pages/Profile'; 


const App = () => {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/session-request" element={<SessionRequest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      <Footer />
    </>
  );
};

export default App;
