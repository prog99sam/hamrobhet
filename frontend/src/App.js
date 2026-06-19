import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";



import Login from "./auth/Login";
import Lander from "./components/Lander";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Lander />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;