import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";



import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Lander from "./components/Lander";
import Explore from "./components/Explore";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";

function App() {
  return (
    <>
   
    <BrowserRouter>
 
      <Routes>

        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sub" element={<Subscribe />} />
        <Route path="/exp" element={<Explore />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;