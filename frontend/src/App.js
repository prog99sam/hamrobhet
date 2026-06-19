import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";



import Login from "./Login";
import Lander from "./Lander";

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