import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Lander from "./components/Lander";
import Explore from "./components/Explore";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <>
   
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sub" element={<Subscribe />} />
        <Route path="/exp" element={<Explore />} />
        <Route path="/signup" element={<Signup />} />
        

      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;