import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
// import Registration from './pages/Registration';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import SessionRequest from './pages/SessionRequest';

const App = () => {
  return (
    <>
      <Header />
      {/* <BrowserRouter>
        <Routes> */}
          {/* <Route path="/register" element={<Registration />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/session-request" element={<SessionRequest />} /> */}
        {/* </Routes>
      </BrowserRouter> */}
      <Footer />
    </>
  );
};

export default App;
