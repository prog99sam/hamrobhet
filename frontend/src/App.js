import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CreatorSignup from "./auth/CreatorSignup";
import Lander from "./components/Lander";
import CreatorDashboard from "./components/CreatorDashboard";
import CreatorProfile from "./components/CreatorProfile";
import CreatePost from "./components/CreatePost";
import Explore from "./components/Explore";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { isAuthenticated } from "./auth/auth.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={isAuthenticated() ? <Navigate to="/creator/dashboard" /> : <Lander />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={isAuthenticated() ? <Navigate to="/creator/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated() ? <Navigate to="/creator/dashboard" /> : <Signup />} />

        <Route path="/creator/signup" element={isAuthenticated() ? <CreatorSignup /> : <Navigate to="/login" />} />

        <Route path="/exp" element={<Explore />} />
        <Route path="/sub" element={isAuthenticated() ? <Subscribe /> : <Navigate to="/login" /> } />

        <Route path="/creator/dashboard" element={isAuthenticated() ? <CreatorDashboard /> : <Navigate to="/login" />} />
        <Route path="/creator/post" element={isAuthenticated() ? <CreatePost /> : <Navigate to="/login" />} />

        <Route path="/profile" element={<CreatorProfile />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;