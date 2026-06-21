import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";



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
        <Route path="/creator/signup" element={<CreatorSignup />} />
        <Route path="/creator/post" element={<CreatePost/>} />
        <Route path="/creator/dashboard" element={<CreatorDashboard />} />
        <Route path="/profile" element={<CreatorProfile />} />

      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;