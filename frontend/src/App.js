import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Lander from "./components/Lander";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;