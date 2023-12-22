import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Gallery from "../pages/Gallery";
import Favorites from "../pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
