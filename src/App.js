import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import UserDashboard from "./components/pages/UserDashboard";

const APP = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/loginpage" element={<LoginPage></LoginPage>}></Route>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/header" element={<Header></Header>} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>
  );
};

export default APP;