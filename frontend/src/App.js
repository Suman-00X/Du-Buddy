import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import SessionRequest from './pages/SessionRequest';
import Profile from './pages/Profile';
import AboutProfile from './components/AboutProfile';


const App = () => {
  return (
    <>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/session-request" element={<SessionRequest />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<AboutProfile />} />
          </Routes>
        </main>
        <Footer />
      </div >
    </>
  );
};

export default App;
